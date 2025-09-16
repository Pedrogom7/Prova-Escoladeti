import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const acessorioTable = pgTable('acessorio', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 255 }).notNull(),
});
