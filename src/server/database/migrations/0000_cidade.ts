import type { Knex } from 'knex';
import { EnameTable } from '../../shared/types/EnameTable';

export async function up(knex: Knex): Promise<void> {
    return await knex.schema
        .createTable(EnameTable.cidade, (table) => {
            table.bigIncrements('id').primary().index().notNullable();
            table
                .string('nome')
                .checkLength('>', 3)
                .checkLength('<=', 100)
                .index()
                .notNullable();
            table.string('estado').checkLength('=', 2).notNullable();
        })
        .then(() => console.log(`Created table ${EnameTable.cidade}`));
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema
        .dropTable(EnameTable.cidade)
        .then(() => console.log(`Dropped table ${EnameTable.cidade}`));
}
