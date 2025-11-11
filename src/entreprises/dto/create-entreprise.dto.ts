import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateEntrepriseDto {
  @IsString()
  raison_sociale: string;

  @IsOptional()
  @IsString()
  siret?: string;

  @IsOptional()
  @IsString()
  forme_juridique?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  code_postal?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  capital_social?: number;

  @IsOptional()
  @IsString()
  numero_tva_intra?: string;

  @IsOptional()
  @IsString()
  code_naf?: string;

  @IsOptional()
  @IsString()
  regime_fiscal?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  actif?: boolean;
}
