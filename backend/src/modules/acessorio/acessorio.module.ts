import { Module } from '@nestjs/common';
import { AcessorioService } from './acessorio.service';
import { ACessorioController } from './acessorio.controller';
import { DrizzleModule } from 'src/db/drizzle/drizzle.module';

@Module({
  controllers: [ACessorioController],
  providers: [AcessorioService],
  imports: [DrizzleModule],
})
// eslint-disable-next-line prettier/prettier
export class GadoModule { }
