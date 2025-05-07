import type { Knex } from 'knex'
import { ENameTable } from '../../model/ENameTable'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable(ENameTable.cidades, (table) => {
      table.bigIncrements('id').primary().index().notNullable()
      table.string('nome').index().notNullable()
      table.string('estado').checkLength('=', 2).index().notNullable()
    })
    .then(() => console.log(`Created Table ${ENameTable.cidades}`))
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema
    .dropTable(ENameTable.cidades)
    .then(() => console.log(`Table ${ENameTable.cidades} dropped`))
}
