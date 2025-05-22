import * as yup from 'yup';
import { TUsuario } from '../../../shared/types/TUsuario';
export const UBodyValidation: yup.ObjectSchema<TUsuario> = yup.object().shape({
    id: yup.number().optional().typeError('id deve ser do tipo número'),
    nome: yup
        .string()
        .min(3, 'nome deve ter ao menos 3 caracteres')
        .max(100, 'nome deve ter no máximo 100 caracteres')
        .required('nome é obrigatório')
        .typeError('nome deve ser do tipo string'),
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
