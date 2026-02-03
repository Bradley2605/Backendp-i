import { IsOptional, IsDateString } from 'class-validator';

export class GetPurchasesQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
