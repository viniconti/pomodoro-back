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
import { Public } from 'src/auth/public.decorator';
import { CreateCycleDto } from './dto/createCycleDto';
import { CycleHistoryService } from './cycle_history.service';
import { UpdateHistoryDto } from './dto/updateHistoryDto';

@Controller('cycle-history')
export class CycleHistoryController {
  constructor(private readonly cycleHistory: CycleHistoryService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post(':userId')
  newHistory(
    @Body() createCycleDto: CreateCycleDto,
    @Param('userId', new ParseIntPipe()) userId: number,
  ) {
    return this.cycleHistory.newHistory(createCycleDto, userId);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  getHiestory() {
    return this.cycleHistory.getHistory();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  foundHistoryById(@Param('id') id: string) {
    return this.cycleHistory.findCycleById(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateHistory(
    @Param('id') id: string,
    @Body() updatedHistoryDto: UpdateHistoryDto,
  ) {
    return this.cycleHistory.updateHistory(id, updatedHistoryDto);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteHistory(@Param('id') id: string) {
    return this.cycleHistory.deleteHistory(id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('cycle-time/:id')
  calculateCycleTime(@Param('id') id: string) {
    return this.cycleHistory.calculateCycleTime(id);
  }
}
