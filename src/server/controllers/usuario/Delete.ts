import { Request, Response } from 'express';
import { TIdParam } from '../../shared/types/TIdParam';
import { StatusCodes } from 'http-status-codes';
import { usuarioProvider } from '../../database/providers/usuario';
import { counter } from '../../shared/model/Counter';
import { EnameTable } from '../../shared/types/EnameTable';
import { validation } from '../../shared/middleware/Validation';
import { IdValidation } from '../../shared/model/yup/IdValidation';

const deleteValidation = validation({
    params: IdValidation,
});

const deleteById = async (req: Request<TIdParam>, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id deve ser informado' } });
    }
    const count = await counter(id, EnameTable.usuario, 'deletar');
    if (count == 'id não encontrado') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'id não encontrado' } });
    } else if (count == 'erro ao deletar registro') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: 'erro ao deletar registro' } });
    }
    const deleteId = await usuarioProvider.deleteById(id);
    if (deleteId instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: deleteId.message } });
    }
    return res.status(StatusCodes.OK).json(deleteId);
};
export { deleteValidation, deleteById };
