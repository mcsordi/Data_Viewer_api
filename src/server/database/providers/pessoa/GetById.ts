import { EnameTable } from '../../../shared/types/EnameTable';
import { TPessoa } from '../../../shared/types/TPessoa';
import { Knex } from '../../knex';

const getById = async (id: number): Promise<TPessoa[] | Error> => {
    try {
        const getById = await Knex(EnameTable.pessoa)
            .where('id', '=', `${id}`)
            .returning('*');
        if (typeof getById !== 'object') {
            return new Error('Erro ao consultar registro por id');
        }
        return getById;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registro por id');
    }
};
export { getById };
