import * as yup from 'yup';
import { TCidade } from '../../../shared/types/TCidade';
const bodyValidation: yup.ObjectSchema<TCidade> = yup.object().shape({
    id: yup.number().optional().typeError('Id deve ser do tipo número'),
    nome: yup
        .string()
        .min(3, 'nome deve ter ao menos 3 caractéres')
        .max(100, 'nome deve ter no maximo 100 caractéres')
        .required('nome é obrigatório')
        .typeError('nome deve ser do tipo string'),
    estado: yup
        .string()
        .min(2, 'estado deve ter 2 caratéres')
        .max(2, 'estado deve ter 2 caratéres')
        .required('estado é obrigatório')
        .typeError('estado deve ser do tipo string'),
});

export { bodyValidation };
