import * as signUp from './SingUp';
import * as signIn from './SignIn';
import * as update from './Update';
import * as deleteById from './Delete';

export const usuarioController = {
    ...signUp,
    ...signIn,
    ...update,
    ...deleteById,
};
