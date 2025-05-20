import { TCidade } from '../../../shared/types/TCidade';
import { TPessoa } from '../../../shared/types/TPessoa';

declare module 'knex/types/tables' {
    interface Tables {
        cidade: TCidade;
        pessoa: TPessoa;
        // usuario: TUsuario;
    }
}
