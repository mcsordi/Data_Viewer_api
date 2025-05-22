import { EnameTable } from '../../../shared/types/EnameTable';
import { TUsuario } from '../../../shared/types/TUsuario';
import { Knex } from '../../knex';

const singUp = async (body: TUsuario): Promise<TUsuario[] | Error> => {
    try {
        const singUp = await Knex(EnameTable.usuario)
            .insert(body)
            .returning('*');
        if (typeof singUp != 'object') {
            return new Error('Erro ao criar novo usuário');
        }
        return singUp;
    } catch (error) {
        console.log('🚀 ~ singUp ~ error:', error);
        return new Error('Erro ao criar novo usuário');
    }
};
export { singUp };
