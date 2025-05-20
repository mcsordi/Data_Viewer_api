import * as yup from 'yup';
import { TIdParam } from '../../../shared/types/TIdParam';
export const IdValidation: yup.ObjectSchema<TIdParam> = yup.object().shape({
    id: yup
        .number()
        .moreThan(0, 'Id deve ser maior do que 0')
        .integer('Id deve ser um número inteiro')
        .required('Id é obrigatório')
        .typeError('Id deve ser do tipo número'),
});
