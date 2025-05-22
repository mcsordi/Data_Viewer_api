import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { cidadeValidation } from '../../shared/model';
import { TIdParam } from '../../shared/types/TIdParam';
import { cidadeProvider } from '../../database/providers/cidade';
import { StatusCodes } from 'http-status-codes';
import { EnameTable } from '../../shared/types/EnameTable';
import { counter } from '../../shared/model/Counter';

const getByIdValidation = validation({
    params: cidadeValidation.IdValidation,
});
const getById = async (req: Request<TIdParam>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id è obrigatório' } });
    }
    const count = await counter(id, EnameTable.cidade, 'consultar');

    if (count == 'id não encontrado') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'id não encontrado' } });
    } else if (count == 'erro ao consultar registro') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: 'erro ao consultar registro' } });
    }

    const getById = await cidadeProvider.getById(id);

    if (getById instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: getById.message } });
    }
    return res.status(StatusCodes.OK).json(getById);
};
export { getByIdValidation, getById };
