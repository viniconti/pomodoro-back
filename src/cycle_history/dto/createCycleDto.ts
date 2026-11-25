import { IsDateString } from 'class-validator';

export class CreateCycleDto {
  @IsDateString()
  startedAt: string;

  @IsDateString()
  finishedAt: string;
}
