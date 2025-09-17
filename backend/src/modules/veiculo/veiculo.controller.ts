import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVeiculoDto: UpdateVeiculoDto,
  ) {
    return this.veiculoService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.veiculoService.delete(id);
  }

  @Post(':id/acessorios/:acessorioId')
  addAcessorio(
    @Param('id', ParseIntPipe) veiculoId: number,
    @Param('acessorioId', ParseIntPipe) acessorioId: number,
  ) {
    return this.veiculoService.addAcessorio(veiculoId, acessorioId);
  }
  @Delete(':id/acessorios/:acessorioId')
  removeAcessorio(
    @Param('id', ParseIntPipe) veiculoId: number,
    @Param('acessorioId', ParseIntPipe) acessorioId: number,
  ) {
    return this.veiculoService.removeAcessorio(veiculoId, acessorioId);
  }
}
