import { EnameTable } from '../../../shared/types/EnameTable';
import { TCidade } from '../../../shared/types/TCidade';
import { Knex } from '../../knex';

const create = async (body: TCidade): Promise<TCidade | Error> => {
    try {
        const createProvider = await Knex(EnameTable.cidade)
            .insert(body)
            .returning('*')
            .first();
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
