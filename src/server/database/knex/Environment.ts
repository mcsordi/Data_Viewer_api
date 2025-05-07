/* eslint-disable @typescript-eslint/no-explicit-any */
import { Knex } from 'knex'
import * as path from 'path'

const development: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: path.resolve('..', '..', '..', '..', './viewer.db'),
  },
  pool: {
    afterCreate: (connection: any, done: () => void) => {
      connection.run('PRAGMA foreign_keys = ON')
      done()
    },
  },
  migrations: {
    directory: path.resolve('migrations'),
  },
  seeds: {
    directory: path.resolve('seeds'),
  },
}
const test: Knex.Config = {
  ...development,
  connection: {
    filename: ':memory:',
  },
}
const production: Knex.Config = {
  ...development,
}

export const environment = {
  development,
  test,
  production,
}
