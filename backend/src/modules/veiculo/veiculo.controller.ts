import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Controller('veiculos')
export class VeiculoController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly veiculoService: VeiculoService) { }

  @Get()
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.findOneById(id);
  }

  @Post()
  create(@Body() CreateVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(CreateVeiculoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateVeiculoDto: UpdateVeiculoDto,
  ) {
    return this.veiculoService.update(id, UpdateVeiculoDto);
  }

  @Delete('id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.delete(id);
  }
}
