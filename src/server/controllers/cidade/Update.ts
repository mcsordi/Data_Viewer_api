/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { cidadeValidation } from '../model';
import { TIdParam } from '../../shared/types/TIdParam';
import { TCidade } from '../../shared/types/TCidade';
import { StatusCodes } from 'http-status-codes';
import { cidadeProvider } from '../../database/providers/cidade';
import { Knex } from '../../database/knex';
import { EnameTable } from '../../shared/types/EnameTable';

const updateValidation = validation({
    params: cidadeValidation.IdValidation,
    body: cidadeValidation.bodyValidation,
});
const update = async (req: Request<TIdParam, {}, TCidade>, res: Response) => {
    const body = req.body;
    const { id } = req.params;
    const [{ count }] = await Knex(EnameTable.cidade)
        .where('id', '=', id)
        .count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || count < 1) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Id não encontrado' } });
    }
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id é obrigatório' } });
    }

    const update = await cidadeProvider.update(id, body);
    if (update instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: update.message } });
    }
    return res.status(StatusCodes.OK).json(update);
};
export { updateValidation, update };
