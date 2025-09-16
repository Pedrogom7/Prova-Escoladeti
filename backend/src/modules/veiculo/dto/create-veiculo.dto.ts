import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
export class CreateVeiculoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  identificacao!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  modelo?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  anoFabricacao?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  placa?: string;
}
