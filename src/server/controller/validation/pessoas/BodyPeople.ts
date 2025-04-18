import * as yup from 'yup';
import { TPeople } from '../../../shared/types/People';
export const validate: yup.ObjectSchema<TPeople> = yup.object().shape({
  id: yup.number(),
  nome: yup
    .string()
    .min(3, 'Atributo nome precisa ter ao menos 3 caracteres')
    .required('Atributo nome é requerido'),
  email: yup
    .string()
    .email('Atributo email precisa ser do tipo email')
    .required('Atributo email é requerido'),
});
