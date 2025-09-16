import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const veiculoTable = pgTable('veiculo', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  modelo: varchar({ length: 100 }).notNull(),
  anoFabricacao: integer().notNull(),
  placa: varchar({ length: 6 }).notNull().unique(),
});
