import * as yup from 'yup';
import { TPessoa } from '../../../shared/types/TPessoa';
const PBodyValidation: yup.ObjectSchema<TPessoa> = yup.object().shape({
    id: yup.number().optional().typeError('id deve ser do tipo número'),
    nome: yup
        .string()
        .min(3, 'nome deve ter ao menos 3 caracteres')
        .max(100, 'nome deve ter no maximo 100 caracteres')
        .typeError('nome deve ser do tipo string')
        .required('nome é obrigatório'),
    email: yup
        .string()
        .email('email deve ser do tipo email')
        .max(100, 'email deve ter no maximo 100 caracteres')
        .typeError('email deve ser do tipo email')
        .required('email é obrigatório'),
    cidadeId: yup
        .number()
        .required('cidadeId é obrigatório')
        .integer('cidadeId deve ser um número inteiro')
        .moreThan(0, 'cidadeId deve ser maior do que 0')
        .typeError('cidadeId deve ser do tipo número'),
});
export { PBodyValidation };
