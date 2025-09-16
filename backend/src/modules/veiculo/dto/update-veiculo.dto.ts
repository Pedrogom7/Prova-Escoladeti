import { PartialType } from '@nestjs/mapped-types';
import { CreateVeiculoDto } from './create-veiculo.dto';

// eslint-disable-next-line prettier/prettier
export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) { }
