import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { DrizzleModule } from 'src/db/drizzle/drizzle.module';

@Module({
  controllers: [VeiculoController],
  providers: [VeiculoService],
  imports: [DrizzleModule],
})
// eslint-disable-next-line prettier/prettier
export class GadoModule { }
