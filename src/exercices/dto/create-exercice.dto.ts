import { IsNumber, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExerciceDto {
  @IsNumber()
  entreprise_id: number;

  @IsNumber()
  annee: number;

  @Type(() => Date)
  @IsDate()
  date_debut: Date;

  @Type(() => Date)
  @IsDate()
  date_fin: Date;

  @IsOptional()
  @IsBoolean()
  cloture?: boolean;
}
