/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { TIdParam } from '../../shared/types/TIdParam';
import { StatusCodes } from 'http-status-codes';
import { Knex } from '../../database/knex';
import { EnameTable } from '../../shared/types/EnameTable';
import { TPessoa } from '../../shared/types/TPessoa';
import { pessoaProvider } from '../../database/providers/pessoa';
import { pessoaValidation } from '../model';

const updateValidation = validation({
    params: pessoaValidation.IdValidation,
    body: pessoaValidation.PBodyValidation,
});
const update = async (req: Request<TIdParam, {}, TPessoa>, res: Response) => {
    const body = req.body;
    const { id } = req.params;
    const [{ count }] = await Knex(EnameTable.pessoa)
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

    const update = await pessoaProvider.update(id, body);
    if (update instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: update.message } });
    }
    return res.status(StatusCodes.OK).json(update);
};
export { updateValidation, update };
