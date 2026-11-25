import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCycleDto } from './dto/createCycleDto';
import { UpdateHistoryDto } from './dto/updateHistoryDto';

@Injectable()
export class CycleHistoryService {
  constructor(private prismaService: PrismaService) {}

  async newHistory(createCycleDto: CreateCycleDto, userId: number) {
    const startedAt = new Date(createCycleDto.startedAt);
    const finishedAt = new Date(createCycleDto.finishedAt);

    this.validateInterval(startedAt, finishedAt);

    return this.prismaService.cycleHistory.create({
      data: { startedAt, finishedAt, userID: userId },
    });
  }

  async getHistory(userId: number) {
    return this.prismaService.cycleHistory.findMany({
      where: { userID: userId },
      orderBy: { startedAt: 'desc' },
    });
  }

  async getStats(userId: number) {
    const cycles = await this.prismaService.cycleHistory.findMany({
      where: { userID: userId },
      select: { startedAt: true, finishedAt: true },
    });

    const totalFocusSeconds = cycles.reduce((total, cycle) => {
      const seconds =
        (cycle.finishedAt.getTime() - cycle.startedAt.getTime()) / 1000;

      return total + (Number.isFinite(seconds) && seconds > 0 ? seconds : 0);
    }, 0);

    return {
      totalCycles: cycles.length,
      totalFocusSeconds: Math.floor(totalFocusSeconds),
    };
  }

  async findCycleById(id: number, userId: number) {
    return this.findOwnedCycle(id, userId);
  }

  async updateHistory(
    id: number,
    updatedHistoryDto: UpdateHistoryDto,
    userId: number,
  ) {
    const cycle = await this.findOwnedCycle(id, userId);

    const startedAt = updatedHistoryDto.startedAt
      ? new Date(updatedHistoryDto.startedAt)
      : cycle.startedAt;
    const finishedAt = updatedHistoryDto.finishedAt
      ? new Date(updatedHistoryDto.finishedAt)
      : cycle.finishedAt;

    this.validateInterval(startedAt, finishedAt);

    return this.prismaService.cycleHistory.update({
      where: { id },
      data: { startedAt, finishedAt },
    });
  }

  async deleteHistory(id: number, userId: number) {
    await this.findOwnedCycle(id, userId);

    await this.prismaService.cycleHistory.delete({ where: { id } });
  }

  async calculateCycleTime(id: number, userId: number) {
    const cycle = await this.findOwnedCycle(id, userId);

    const difference = cycle.finishedAt.getTime() - cycle.startedAt.getTime();

    return { cycleTimeInMinuts: difference / (1000 * 60) };
  }

  private async findOwnedCycle(id: number, userId: number) {
    const cycle = await this.prismaService.cycleHistory.findFirst({
      where: { id, userID: userId },
    });

    if (!cycle) {
      throw new NotFoundException('this History does not exists');
    }

    return cycle;
  }

  private validateInterval(startedAt: Date, finishedAt: Date) {
    if (
      Number.isNaN(startedAt.getTime()) ||
      Number.isNaN(finishedAt.getTime())
    ) {
      throw new BadRequestException('Datas inválidas.');
    }

    if (finishedAt.getTime() <= startedAt.getTime()) {
      throw new BadRequestException('finishedAt deve ser maior que startedAt.');
    }
  }
}
