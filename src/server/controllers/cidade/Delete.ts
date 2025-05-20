import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { cidadeValidation } from '../model';
import { TIdParam } from '../../shared/types/TIdParam';
import { cidadeProvider } from '../../database/providers/cidade';
import { StatusCodes } from 'http-status-codes';
import { Knex } from '../../database/knex';
import { EnameTable } from '../../shared/types/EnameTable';

const deleteValidation = validation({
    params: cidadeValidation.IdValidation,
});
const deleteById = async (req: Request<TIdParam>, res: Response) => {
    const { id } = req.params;
    const [{ count }] = await Knex(EnameTable.cidade)
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
    const deleteById = await cidadeProvider.deleteByID(id);

    if (deleteById instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: deleteById.message } });
    }
    return res.status(StatusCodes.OK).json(deleteById);
};
export { deleteValidation, deleteById };
