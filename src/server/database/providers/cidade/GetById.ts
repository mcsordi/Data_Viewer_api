import { EnameTable } from '../../../shared/types/EnameTable';
import { TCidade } from '../../../shared/types/TCidade';
import { Knex } from '../../knex';

const getById = async (id: number): Promise<TCidade[] | Error> => {
    try {
        const getById = await Knex(EnameTable.cidade)
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
