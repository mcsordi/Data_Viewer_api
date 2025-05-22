import { EnameTable } from '../../../shared/types/EnameTable';
import { TUsuario } from '../../../shared/types/TUsuario';
import { Knex } from '../../knex';

const update = async (
    id: number,
    body: TUsuario
): Promise<TUsuario[] | Error> => {
    try {
        const update = await Knex(EnameTable.usuario)
            .where('id', '=', id)
            .update(body)
            .returning('*');
        if (typeof update != 'object') {
            return new Error('Erro ao atualizar registro');
        }
        return update;
    } catch (error) {
        console.log('🚀 ~ error:', error);
        return new Error('Erro ao atualizar registro');
    }
};
export { update };
