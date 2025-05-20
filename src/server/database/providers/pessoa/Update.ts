import { EnameTable } from '../../../shared/types/EnameTable';
import { TPessoa } from '../../../shared/types/TPessoa';
import { Knex } from '../../knex';

const update = async (
    id: number,
    body: TPessoa
): Promise<TPessoa[] | Error> => {
    try {
        const updateById = await Knex(EnameTable.pessoa)
            .where('id', '=', `${id}`)
            .update(body)
            .returning('*');
        if (typeof updateById !== 'object') {
            return new Error('Erro ao atualizar registro');
        }
        return updateById;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    }
};
export { update };
