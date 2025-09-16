import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { veiculoTable } from './veiculo';
// import { acessorioTable } from './db/schemas/acessorio';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const veiculo: typeof veiculoTable.$inferInsert = {
    modelo: 'Honda-Civic',
    anoFabricacao: 2024,
    placa: 'ABC2X34',
  };

  await db.insert(veiculoTable).values(veiculo);
  console.log('New veicle created!');

  const veiculos = await db.select().from(veiculoTable);
  console.log('Getting all veiculos from the database: ', veiculos);

  await db
    .update(veiculoTable)
    .set({
      placa: 'ABB2X34',
    })
    .where(eq(veiculoTable.placa, veiculo.placa));
  console.log('Veiculo info updated!');

  await db.delete(veiculoTable).where(eq(veiculoTable.placa, veiculo.placa));
  console.log('placa deleted!');
}

main();
