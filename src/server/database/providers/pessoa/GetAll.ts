import { EnameTable } from '../../../shared/types/EnameTable';
import { TPessoa } from '../../../shared/types/TPessoa';
import { Knex } from '../../knex';

const getAll = async (
    page: number,
    limit: number,
    filter: string
): Promise<TPessoa[] | Error> => {
    try {
        const getAll = await Knex(EnameTable.pessoa)
            .where('nome', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)
            .returning('*');
        if (typeof getAll != 'object') {
            return new Error('Erro ao consultar registros');
        }
        return getAll;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar registros');
    }
};
export { getAll };
