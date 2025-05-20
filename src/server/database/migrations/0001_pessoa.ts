import { Knex } from 'knex';
import { EnameTable } from '../../shared/types/EnameTable';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(EnameTable.pessoa, (table) => {
            table.bigIncrements('id').index().notNullable();
            table
                .string('nome')
                .checkLength('<=', 100)
                .checkLength('>', 2)
                .index()
                .notNullable();
            table
                .string('email')
                .checkLength('<=', 100)
                .index()
                .notNullable()
                .unique();
            table.integer('cidadeId').index().notNullable().unsigned();
            table
                .foreign('cidadeId')
                .references('id')
                .inTable(EnameTable.cidade)
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT');
        })
        .then(() => console.log(`Created table ${EnameTable.pessoa}`));
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema
        .dropTable(EnameTable.pessoa)
        .then(() => console.log(`Dropped table ${EnameTable.pessoa}`));
}
