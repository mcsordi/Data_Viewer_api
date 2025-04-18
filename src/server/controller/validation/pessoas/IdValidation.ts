import * as yup from 'yup';
import { TIdParam } from '../../../shared/types/IdParam';
export const IdValidation: yup.ObjectSchema<TIdParam> = yup.object().shape({
  id: yup
    .number()
    .positive('Id precisa ser maior do que 0')
    .integer('Id não pode ser um float')
    .required('Id é requerido')
    .typeError('Id precisa ser do tipo numero'),
});
