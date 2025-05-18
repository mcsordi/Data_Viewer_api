import { TCidade } from '../../../shared/types/TCidade';

declare module 'knex/types/tables' {
    interface Tables {
        cidade: TCidade;
        // pessoa: TPessoas;
        // usuario: TUsuario;
    }
}
