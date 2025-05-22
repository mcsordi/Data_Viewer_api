import type { Knex } from 'knex';
import { EnameTable } from '../../shared/types/EnameTable';

export async function up(knex: Knex): Promise<void> {
    return await knex.schema
        .createTable(EnameTable.usuario, (table) => {
            table.bigIncrements('id').index().notNullable();
            table
                .string('nome')
                .checkLength('>=', 3)
                .checkLength('<=', 100)
                .notNullable();
            table
                .string('email')
                .checkLength('<=', 100)
                .index()
                .unique()
                .notNullable();
            table
                .string('senha')
                .checkLength('>=', 6)
                .checkLength('<=', 30)
                .notNullable();
        })
        .then(() => console.log(`Created Table ${EnameTable.cidade}`));
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema
        .dropTable(EnameTable.usuario)
        .then(() => console.log(`Dropped table ${EnameTable.usuario}`));
}
