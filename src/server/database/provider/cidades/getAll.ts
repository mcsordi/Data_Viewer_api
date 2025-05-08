import { TCidade } from '../../../shared/types/Cidades';
import { Knex } from '../../knex';

const getAll = async (page: number, limit: number, filter: string): Promise<TCidade[] | Error> => {
  const getAll = await Knex('cidades')
    .select()
    .where('nome', 'like', `%${filter}%`)
    .offset(page - 1)
    .limit(limit)
    .returning('*');
  if (typeof getAll !== 'object') return new Error('Erro ao consultar registros');
  return getAll;
};

export { getAll };
