/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { TUsuario } from '../../shared/types/TUsuario';
import { usuarioProvider } from '../../database/providers/usuario';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware/Validation';
import * as yup from 'yup';
import { decrypt } from '../../shared/services/EncryptPass';
import { Knex } from '../../database/knex';
import { EnameTable } from '../../shared/types/EnameTable';

const signInYupValidation: yup.ObjectSchema<Omit<TUsuario, 'id' | 'nome'>> = yup
    .object()
    .shape({
        email: yup
            .string()
            .email('email deve ser do tipo email')
            .max(100, 'email deve ter no máximo 100 caracteres')
            .required('email é obrigatório')
            .typeError('email deve ser do tipo email'),
        senha: yup
            .string()
            .min(6, 'senha deve ter no minimo 6 caracteres')
            .max(30, 'senha deve ter ao máximo 30 caracteres')
            .required('senha é obrigatória')
            .typeError('senha deve ser do tipo string'),
    });

const signInValidation = validation({
    body: signInYupValidation,
});

const signIn = async (req: Request<{}, {}, TUsuario>, res: Response) => {
    const body = req.body;
    const password = await Knex(EnameTable.usuario).where(
        'email',
        '=',
        body.email
    );
    const comparePass = await decrypt(body.senha, password[0].senha);
    const signIn = await usuarioProvider.signIn(body);
    if (signIn == 'Erro ao realizar login do usuário') {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: 'Erro ao realizar login do usuário' } });
    } else if (signIn == 'Usuário ou senha são invalidos') {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Usuário ou senha são invalidos' } });
    } else if (!comparePass) {
        console.log('!decrypt pass');
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { default: 'Usuário ou senha são invalidos' } });
    }
    return res
        .status(StatusCodes.OK)
        .json({ acessToken: 'aaaa.bbbb.cccc.dddd' });
};
export { signInValidation, signIn };
