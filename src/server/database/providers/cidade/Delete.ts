import { EnameTable } from '../../../shared/types/EnameTable';
import { TCidade } from '../../../shared/types/TCidade';
import { Knex } from '../../knex';

const deleteByID = async (id: number): Promise<TCidade[] | Error> => {
    try {
        const deleteByID = await Knex(EnameTable.cidade)
            .where('id', '=', `${id}`)
            .delete('*')
            .returning('*');

        if (typeof deleteByID == 'object' || typeof deleteByID == 'number') {
            return deleteByID;
        }
        return new Error('Erro ao deletar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar registro');
    }
};
export { deleteByID };
