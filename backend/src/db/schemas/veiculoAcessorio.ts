import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';
import { acessorioTable } from './acessorio';
import { veiculoTable } from './veiculo';

export const veiculoAcessorioTable = pgTable(
  'veiculo_acessorio',
  {
    veiculoId: integer('veiculoId')
      .notNull()
      .references(() => veiculoTable.id, { onDelete: 'cascade' }),
    acessorioId: integer('acessorioId')
      .notNull()
      .references(() => acessorioTable.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.veiculoId, table.acessorioId] }),
  }),
);
