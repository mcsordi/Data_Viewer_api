import * as yup from 'yup';
import { TIdParam } from '../../../shared/types/TIdParam';
export const IdValidation: yup.ObjectSchema<TIdParam> = yup.object().shape({
    id: yup
        .number()
        .moreThan(0, 'id deve ser maior do que 0')
        .integer('id deve ser um número inteiro')
        .required('id é obrigatório')
        .typeError('id deve ser do tipo número'),
});
