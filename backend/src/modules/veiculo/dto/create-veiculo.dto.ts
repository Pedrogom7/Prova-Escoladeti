import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

// eslint-disable-next-line prettier/prettier
export class CreateVeiculoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  modelo!: string;

  @IsInt()
  @IsNotEmpty()
  anoFabricacao!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  placa!: string;
}
