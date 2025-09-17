import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../../db/drizzle/drizzle.module';
import { DrizzleDB } from '../../db/drizzle/types/drizzle';
import { acessorioTable } from 'src/db/schemas/acessorio';
import { CreateAcessorioDto } from './dto/create-acessorio.dto';
import { UpdateAcessorioDto } from './dto/update-acessorio.dto';
@Injectable()
export class AcessorioService {
  // eslint-disable-next-line prettier/prettier
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }

  async findAll() {
    return await this.db.select().from(acessorioTable);
  }

  async findOneById(id: number) {
    const result = await this.db
      .select()
      .from(acessorioTable)
      .where(eq(acessorioTable.id, id));
    if (result.length === 0)
      throw new NotFoundException(`Acessorio ${id} nao encontrado.`);
    return result[0];
  }

  async create(createAcessorioDto: CreateAcessorioDto) {
    return await this.db
      .insert(acessorioTable)
      .values(createAcessorioDto)
      .returning();
  }

  async update(id: number, dto: UpdateAcessorioDto) {
    const data = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(dto).filter(([_, v]) => v !== undefined),
    );

    if (Object.keys(data).length === 0)
      throw new Error('Nenhum campo alterado.');

    const result = await this.db
      .update(acessorioTable)
      .set(data)
      .where(eq(acessorioTable.id, id))
      .returning();

    if (result.length == 0)
      throw new NotFoundException(`Acessorio ${id} nao encontrado.`);
    return result[0];
  }

  async delete(id: number) {
    const result = await this.db
      .delete(acessorioTable)
      .where(eq(acessorioTable.id, id))
      .returning({ id: acessorioTable.id });
    if (result.length === 0)
      throw new NotFoundException('Acessorio nao encontrado.');
    return result[0];
  }
}
