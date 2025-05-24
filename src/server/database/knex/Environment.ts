/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'db.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        afterCreate: function (connection: any, run: Function) {
            connection.run('PRAGMA foreign_keys = ON');
            run();
        },
    },
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
};

export const production: Knex.Config = {
    client: 'pg',
    connection: {
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT) || 5432,
        ssl: { rejectUnauthorized: false },
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds'),
    },
};
