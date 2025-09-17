import { Module } from '@nestjs/common';
import { AcessorioService } from './acessorio.service';
import { AcessorioController } from './acessorio.controller';
import { DrizzleModule } from 'src/db/drizzle/drizzle.module';

@Module({
  controllers: [AcessorioController],
  providers: [AcessorioService],
  imports: [DrizzleModule],
  exports: [AcessorioService],
})
// eslint-disable-next-line prettier/prettier
export class AcessorioModule { }
