import { TCidade } from '../../../shared/types/Cidades';

declare module 'knex/types/tables' {
  interface Tables {
    cidades: TCidade;
    //   pessoas: TPessoas
    //   usuarios: TUsuarios
  }
}
