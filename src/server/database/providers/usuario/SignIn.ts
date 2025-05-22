import { EnameTable } from '../../../shared/types/EnameTable';
import { TUsuario } from '../../../shared/types/TUsuario';
import { Knex } from '../../knex';

const signIn = async (
    body: TUsuario
): Promise<
    | TUsuario[]
    | 'Usuário ou senha são invalidos'
    | 'Erro ao realizar login do usuário'
> => {
    try {
        const [{ count }] = await Knex(EnameTable.usuario)
            .where({
                email: body.email,
                senha: body.senha,
            })
            .count<[{ count: number }]>('* as count');
        const signIn = await Knex(EnameTable.usuario)
            .where({
                email: body.email,
                senha: body.senha,
            })
            .returning('*');
        if (!Number.isInteger(count) || count < 1) {
            return 'Usuário ou senha são invalidos';
        }
        return signIn;
    } catch (error) {
        console.log(error);
        return 'Erro ao realizar login do usuário';
    }
};
export { signIn };
