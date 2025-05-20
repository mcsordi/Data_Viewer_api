import { EnameTable } from '../../../shared/types/EnameTable';
import { Knex } from '../../knex';

const count = async (filter: string): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(EnameTable.cidade)
            .where('nome', 'like', `%${filter}%`)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(count)) {
            return count;
        } else {
            return new Error('Erro ao consultar número de registros');
        }
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar número de registros');
    }
};
export { count };
