import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './db/drizzle/drizzle.module';
import { VeiculoModule } from './modules/veiculo/veiculo.module';
import { AcessorioModule } from './modules/acessorio/acessorio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    VeiculoModule,
    AcessorioModule,
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
