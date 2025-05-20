import { EnameTable } from '../../../shared/types/EnameTable';
import { TCidade } from '../../../shared/types/TCidade';
import { Knex } from '../../knex';

const update = async (
    id: number,
    body: TCidade
): Promise<TCidade[] | Error> => {
    try {
        const updateById = await Knex(EnameTable.cidade)
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
