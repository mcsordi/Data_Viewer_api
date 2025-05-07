import { TCidades } from '../../shared/types'

declare module 'knex/types/tables' {
  interface Tables {
    cidades: TCidades
    //   pessoas: TPessoas
    //   usuarios: TUsuarios
  }
}
