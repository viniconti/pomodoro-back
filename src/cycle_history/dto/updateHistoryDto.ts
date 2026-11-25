import { IsDateString, IsOptional } from 'class-validator';

export class UpdateHistoryDto {
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;
}
