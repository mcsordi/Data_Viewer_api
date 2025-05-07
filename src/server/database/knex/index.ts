import { knex } from 'knex'
import { environment } from './Environment'

const selectEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return environment.production
    case 'test':
      return environment.test

    default:
      return environment.development
  }
}

export const knexServer = knex(selectEnv())
