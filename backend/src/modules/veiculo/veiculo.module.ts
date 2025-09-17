import { Module, forwardRef } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { DrizzleModule } from 'src/db/drizzle/drizzle.module';
import { AcessorioModule } from '../acessorio/acessorio.module';

@Module({
  imports: [DrizzleModule, forwardRef(() => AcessorioModule)],
  controllers: [VeiculoController],
  providers: [VeiculoService],
  exports: [VeiculoService],
})
// eslint-disable-next-line prettier/prettier
export class VeiculoModule { }
