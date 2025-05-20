import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { TIdParam } from '../../shared/types/TIdParam';
import { StatusCodes } from 'http-status-codes';
import { Knex } from '../../database/knex';
import { EnameTable } from '../../shared/types/EnameTable';
import { pessoaProvider } from '../../database/providers/pessoa';
import { pessoaValidation } from '../model';

const getByIdValidation = validation({
    params: pessoaValidation.IdValidation,
});
const getById = async (req: Request<TIdParam>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id è obrigatório' } });
    }
    const getById = await pessoaProvider.getById(id);
    const [{ count }] = await Knex(EnameTable.pessoa)
        .where('id', '=', `${id}`)
        .count<[{ count: number }]>('* as count');

    if (!Number.isInteger(count) || count < 1) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Id não encontrado' } });
    }
    if (getById instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: getById.message } });
    }
    return res.status(StatusCodes.OK).json(getById);
};
export { getByIdValidation, getById };
