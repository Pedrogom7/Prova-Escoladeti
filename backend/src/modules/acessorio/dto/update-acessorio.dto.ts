import { PartialType } from '@nestjs/mapped-types';
import { CreateAcessorioDto } from './create-acessorio.dto';

// eslint-disable-next-line prettier/prettier
export class UpdateAcessorioDto extends PartialType(CreateAcessorioDto) { }