import { EnameTable } from '../../../shared/types/EnameTable';
import { TUsuario } from '../../../shared/types/TUsuario';
import { Knex } from '../../knex';

const deleteById = async (id: number): Promise<TUsuario[] | Error> => {
    try {
        const deleteById = await Knex(EnameTable.usuario)
            .where('id', '=', id)
            .delete('*')
            .returning('*');
        if (typeof deleteById == 'object' || typeof deleteById == 'number') {
            return deleteById;
        }
        return new Error('Erro ao deletar registro');
    } catch (error) {
        console.log('🚀 ~ error:', error);
        return new Error('Erro ao deletar registro');
    }
};
export { deleteById };
