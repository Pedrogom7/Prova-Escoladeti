import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

// eslint-disable-next-line prettier/prettier
export class CreateAcessorioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  identificacao!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  nome?: string;
}
