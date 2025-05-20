import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { pessoaValidation } from '../model';
import { TIdParam } from '../../shared/types/TIdParam';
import { StatusCodes } from 'http-status-codes';
import { Knex } from '../../database/knex';
import { EnameTable } from '../../shared/types/EnameTable';
import { pessoaProvider } from '../../database/providers/pessoa';

const deleteValidation = validation({
    params: pessoaValidation.IdValidation,
});
const deleteById = async (req: Request<TIdParam>, res: Response) => {
    const { id } = req.params;
    const [{ count }] = await Knex(EnameTable.pessoa)
        .where('id', '=', id)
        .count<[{ count: number }]>('* as count');
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id deve ser informado' } });
    }
    if (!Number.isInteger(count) || count < 1) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Id não encontrado' } });
    }
    const deleteById = await pessoaProvider.deleteByID(id);

    if (deleteById instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: deleteById.message } });
    }
    return res.status(StatusCodes.OK).json(deleteById);
};
export { deleteValidation, deleteById };
