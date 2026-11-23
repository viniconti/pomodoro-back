import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateHistoryDto } from './dto/updateHistoryDto';

@Injectable()
export class CycleHistoryService {
  constructor(private prismaService: PrismaService) {}

  async newHistory(createCycleDto, userId: number) {
    const cycle = await this.prismaService.cycleHistory.create({
      data: { ...createCycleDto, userID: userId },
    });

    return cycle;
  }

  async getHistory() {
    const history = await this.prismaService.cycleHistory.findMany();

    return history;
  }

  async findCycleById(id: String) {
    const history = await this.prismaService.cycleHistory.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!history) throw new NotFoundException('this History does not exists');

    return history;
  }

  async updateHistory(id: String, updatedHistoryDto: UpdateHistoryDto) {
    await this.findCycleById(id);

    const updatedHistory = await this.prismaService.cycleHistory.update({
      where: {
        id: Number(id),
      },

      data: updatedHistoryDto,
    });

    return updatedHistory;
  }

  async deleteHistory(id: String) {
    await this.findCycleById(id);

    const deletedUser = await this.prismaService.cycleHistory.delete({
      where: {
        id: Number(id),
      },
    });

    return deletedUser;
  }

  async calculateCycleTime(id: string) {
    const cycle = await this.findCycleById(id);

    const difference = cycle.finishedAt.getTime() - cycle.startedAt.getTime();

    const cycleTimeInMinuts = difference / (1000 * 60);

    return { cycleTimeInMinuts };
  }
}
