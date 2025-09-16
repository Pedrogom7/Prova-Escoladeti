import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../db/drizzle/drizzle.module';
import { DrizzleDB } from '../../db/drizzle/types/drizzle';
import { veiculoTable } from '../../db/schemas/veiculo';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculoService {
  // eslint-disable-next-line prettier/prettier
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }

  async findAll() {
    return await this.db.select().from(veiculoTable);
  }

  async findOneById(id: number) {
    const result = await this.db
      .select()
      .from(veiculoTable)
      .where(eq(veiculoTable.id, id));
    if (result.length === 0)
      throw new NotFoundException(`veiculo ${id} nao encontrado.`);
    return result[0];
  }

  async create(createVeiculoDto: CreateVeiculoDto) {
    return await this.db
      .insert(veiculoTable)
      .values(createVeiculoDto)
      .returning();
  }

  async update(id: number, dto: UpdateVeiculoDto) {
    const data = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(dto).filter(([_, v]) => v !== undefined),
    );

    if (Object.keys(data).length === 0)
      throw new Error('Nenhum campo alterado.');

    const result = await this.db
      .update(veiculoTable)
      .set(data)
      .where(eq(veiculoTable.id, id))
      .returning();

    if (result.length == 0)
      throw new NotFoundException(`Veiculo ${id} nao encontrado.`);
    return result[0];
  }

  async delete(id: number) {
    const result = await this.db
      .delete(veiculoTable)
      .where(eq(veiculoTable.id, id))
      .returning({ id: veiculoTable.id });
    if (result.length === 0)
      throw new NotFoundException('Veiculo nao encontrado.');
    return result[0];
  }
}
