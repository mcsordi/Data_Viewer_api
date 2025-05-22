import { TCidade } from '../../../shared/types/TCidade';
import { TPessoa } from '../../../shared/types/TPessoa';
import { TUsuario } from '../../../shared/types/TUsuario';

declare module 'knex/types/tables' {
    interface Tables {
        cidade: TCidade;
        pessoa: TPessoa;
        usuario: TUsuario;
    }
}
