import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// eslint-disable-next-line prettier/prettier
export class CreateAcessorioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  nome!: string;
}
