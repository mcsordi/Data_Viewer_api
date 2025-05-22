/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { TUsuario } from '../../shared/types/TUsuario';
import { usuarioProvider } from '../../database/providers/usuario';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware/Validation';
import { UBodyValidation } from '../model/yup/UBodyValidation';

const signUpValidation = validation({ body: UBodyValidation });

const signUp = async (req: Request<{}, {}, TUsuario>, res: Response) => {
    const body = req.body;
    const signUp = await usuarioProvider.singUp(body);
    if (signUp instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: signUp.message } });
    }
    return res.status(StatusCodes.OK).json(signUp);
};

export { signUpValidation, signUp };
