import { Module } from '@nestjs/common';
import { CycleHistoryController } from './cycle_history.controller';
import { CycleHistoryService } from './cycle_history.service';

@Module({
  controllers: [CycleHistoryController],
  providers: [CycleHistoryService]
})
export class CycleHistoryModule {}
