import { decrypt } from '../../../shared/services/EncryptPass';
import { EnameTable } from '../../../shared/types/EnameTable';
import { TUsuario } from '../../../shared/types/TUsuario';
import { Knex } from '../../knex';

const signIn = async (
    body: TUsuario
): Promise<
    | void
    | 'Usuário ou senha são invalidos'
    | 'Erro ao realizar login do usuário'
> => {
    try {
        const { email, senha } = body;
        const password = await Knex(EnameTable.usuario).where(
            'email',
            '=',
            email
        );
        const comparePass = await decrypt(senha, password[0].senha);

        const [{ count }] = await Knex(EnameTable.usuario)
            .where({
                email: email,
                senha: comparePass ? password[0].senha : '',
            })
            .count<[{ count: number }]>('* as count');

        if (!Number.isInteger(count) || count < 1) {
            return 'Usuário ou senha são invalidos';
        }
    } catch (error) {
        console.log(error);
        return 'Erro ao realizar login do usuário';
    }
};
export { signIn };
