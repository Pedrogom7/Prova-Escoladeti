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
import { AcessorioService } from './acessorio.service';
import { CreateAcessorioDto } from './dto/create-acessorio.dto';
import { UpdateAcessorioDto } from './dto/update-acessorio.dto';
@Controller('acessorios')
export class AcessorioController {
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
  create(@Body() createAcessorioDto: CreateAcessorioDto) {
    return this.acessorioService.create(createAcessorioDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVeiculoDto: UpdateAcessorioDto,
  ) {
    return this.acessorioService.update(id, updateVeiculoDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.acessorioService.delete(id);
  }
}
