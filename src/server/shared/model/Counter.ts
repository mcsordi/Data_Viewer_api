import { Knex } from '../../database/knex';

const counter = async (
    id: number,
    nameTable: string,
    errorMessage: string
): Promise<number | string> => {
    try {
        const [{ count }] = await Knex(nameTable)
            .where('id', '=', id)
            .count<[{ count: number }]>('* as count');
        if (!Number.isInteger(count)) {
            return `erro ao ${errorMessage} registro`;
        } else if (count < 1) {
            return `id não encontrado`;
        }
        return count;
    } catch (error) {
        console.log('🚀 ~ error:', error);
        return `erro ao ${errorMessage} registro`;
    }
};
export { counter };
