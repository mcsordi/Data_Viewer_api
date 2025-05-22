import { decrypt } from '../../../shared/services/EncryptPass';
import { EnameTable } from '../../../shared/types/EnameTable';
import { TUsuario } from '../../../shared/types/TUsuario';
import { Knex } from '../../knex';

const signIn = async (
    body: TUsuario
): Promise<
    | void
    | 'USUÁRIO OU SENHA SÃO INVALIDOS'
    | 'ERRO AO REALIZAR LOGIN DO USUÁRIO'
> => {
    try {
        const { email, senha } = body;
        const password = await Knex(EnameTable.usuario)
            .where('email', '=', email)
            .first('*');
        const comparePass = await decrypt(senha, password.senha);

        const [{ count }] = await Knex(EnameTable.usuario)
            .where({
                email: email,
                senha: comparePass ? password.senha : '',
            })
            .count<[{ count: number }]>('* as count');

        if (!Number.isInteger(count) || count < 1) {
            return 'USUÁRIO OU SENHA SÃO INVALIDOS';
        }
    } catch (error) {
        console.log(error);
        return 'ERRO AO REALIZAR LOGIN DO USUÁRIO';
    }
};
export { signIn };
