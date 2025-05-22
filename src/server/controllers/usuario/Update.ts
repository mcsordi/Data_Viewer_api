/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { TIdParam } from '../../shared/types/TIdParam';
import { TUsuario } from '../../shared/types/TUsuario';
import { StatusCodes } from 'http-status-codes';
import { usuarioProvider } from '../../database/providers/usuario';
import { counter } from '../../shared/model/Counter';
import { EnameTable } from '../../shared/types/EnameTable';
import { validation } from '../../shared/middleware/Validation';
import { IdValidation } from '../../shared/model/yup/IdValidation';
import { UBodyValidation } from '../../shared/model/yup/UBodyValidation';
import { encrypt } from '../../shared/services/EncryptPass';

const updateValidation = validation({
    params: IdValidation,
    body: UBodyValidation,
});

const update = async (req: Request<TIdParam, {}, TUsuario>, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const comparePass = await encrypt(body.senha);
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Parametro id deve ser informado' } });
    }
    const count = await counter(id, EnameTable.usuario, 'atualizar');
    if (count == 'id não encontrado') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'id não encontrado' } });
    } else if (count == 'erro ao atualizar registro') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: 'erro ao atualizar registro' } });
    }
    const update = await usuarioProvider.update(id, {
        ...body,
        senha: comparePass,
    });
    if (update instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: update.message } });
    }
    return res.status(StatusCodes.OK).json(update);
};
export { updateValidation, update };
