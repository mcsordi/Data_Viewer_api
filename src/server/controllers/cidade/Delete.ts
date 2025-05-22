import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { cidadeValidation } from '../../shared/model';
import { TIdParam } from '../../shared/types/TIdParam';
import { cidadeProvider } from '../../database/providers/cidade';
import { StatusCodes } from 'http-status-codes';
import { EnameTable } from '../../shared/types/EnameTable';
import { counter } from '../../shared/model/Counter';

const deleteValidation = validation({
    params: cidadeValidation.IdValidation,
});
const deleteById = async (req: Request<TIdParam>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'parametro id deve ser informado' } });
    }

    const count = await counter(id, EnameTable.cidade, 'deletar');

    if (count == 'id não encontrado') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'id não encontrado' } });
    } else if (count == 'erro ao deletar registro') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: 'erro ao deletar registro' } });
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
