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
import { AcessorioService } from './acessorio.service';
import { CreateAcessorioDto } from './dto/create-acessorio.dto';
import { UpdateAcessorioDto } from './dto/update-acessorio.dto';
@Controller('veiculos')
export class ACessorioController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly acessorioService: AcessorioService) { }

  @Get()
  findAll() {
    return this.acessorioService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.acessorioService.findOneById(id);
  }

  @Post()
  create(@Body() CreateAcessorioDto: CreateAcessorioDto) {
    return this.acessorioService.create(CreateAcessorioDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateVeiculoDto: UpdateAcessorioDto,
  ) {
    return this.acessorioService.update(id, UpdateVeiculoDto);
  }

  @Delete('id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.acessorioService.delete(id);
  }
}
