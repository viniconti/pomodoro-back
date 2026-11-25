import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUserId } from 'src/auth/current-user.decorator';
import { CreateCycleDto } from './dto/createCycleDto';
import { CycleHistoryService } from './cycle_history.service';
import { UpdateHistoryDto } from './dto/updateHistoryDto';

@Controller('cycle-history')
export class CycleHistoryController {
  constructor(private readonly cycleHistory: CycleHistoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  newHistory(
    @Body() createCycleDto: CreateCycleDto,
    @CurrentUserId() userId: number,
  ) {
    return this.cycleHistory.newHistory(createCycleDto, userId);
  }

  // Rotas estáticas antes de ':id' para não serem capturadas por ele.
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  getStats(@CurrentUserId() userId: number) {
    return this.cycleHistory.getStats(userId);
  }

  @Get('cycle-time/:id')
  @HttpCode(HttpStatus.OK)
  calculateCycleTime(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() userId: number,
  ) {
    return this.cycleHistory.calculateCycleTime(id, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getHistory(@CurrentUserId() userId: number) {
    return this.cycleHistory.getHistory(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  foundHistoryById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() userId: number,
  ) {
    return this.cycleHistory.findCycleById(id, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedHistoryDto: UpdateHistoryDto,
    @CurrentUserId() userId: number,
  ) {
    return this.cycleHistory.updateHistory(id, updatedHistoryDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteHistory(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() userId: number,
  ) {
    return this.cycleHistory.deleteHistory(id, userId);
  }
}
