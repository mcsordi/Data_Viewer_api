/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex } from 'knex';
import * as path from 'path';

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve('..', '..', '..', '..', './viewer.db'),
  },
  pool: {
    afterCreate: (connection: any, done: () => void) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    },
  },
  migrations: {
    directory: path.resolve('migrations'),
  },
  seeds: {
    directory: path.resolve('seeds'),
  },
};
export const test: Knex.Config = {
  ...development,
  connection: {
    filename: ':memory:',
  },
};
export const production: Knex.Config = {
  ...development,
};
