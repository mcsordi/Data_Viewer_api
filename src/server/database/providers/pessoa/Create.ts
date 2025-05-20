import { EnameTable } from '../../../shared/types/EnameTable';
import { TPessoa } from '../../../shared/types/TPessoa';
import { Knex } from '../../knex';

const create = async (body: TPessoa): Promise<TPessoa[] | Error> => {
    try {
        const createProvider = await Knex(EnameTable.pessoa)
            .insert(body)
            .returning('*');
        if (typeof createProvider != 'object') {
            return new Error('Erro ao criar registro');
        }
        return createProvider;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro');
    }
};
export { create };
