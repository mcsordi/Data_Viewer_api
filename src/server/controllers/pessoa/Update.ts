/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { TIdParam } from '../../shared/types/TIdParam';
import { StatusCodes } from 'http-status-codes';
import { EnameTable } from '../../shared/types/EnameTable';
import { TPessoa } from '../../shared/types/TPessoa';
import { pessoaProvider } from '../../database/providers/pessoa';
import { pessoaValidation } from '../../shared/model';
import { counter } from '../../shared/model/Counter';

const updateValidation = validation({
    params: pessoaValidation.IdValidation,
    body: pessoaValidation.PBodyValidation,
});
const update = async (req: Request<TIdParam, {}, TPessoa>, res: Response) => {
    const body = req.body;
    const { id } = req.params;

    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id é obrigatório' } });
    }
    const count = await counter(id, EnameTable.pessoa, 'atualizar');

    if (count == 'id não encontrado') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'id não encontrado' } });
    } else if (count == 'erro ao atualizar registro') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: 'erro ao atualizar registro' } });
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
