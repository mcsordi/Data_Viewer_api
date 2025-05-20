import { EnameTable } from '../../../shared/types/EnameTable';
import { TPessoa } from '../../../shared/types/TPessoa';
import { Knex } from '../../knex';

const deleteByID = async (id: number): Promise<TPessoa[] | Error> => {
    try {
        const deleteByID = await Knex(EnameTable.pessoa)
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
