import * as yup from 'yup';
import { TCidade } from '../../../shared/types/TCidade';
const bodyValidation: yup.ObjectSchema<TCidade> = yup.object().shape({
    id: yup.number().optional().typeError('Id deve ser do tipo número'),
    nome: yup
        .string()
        .min(3, 'Nome deve ter ao menos 3 caractéres')
        .max(100, 'Nome deve ter no maximo 100 caractéres')
        .required('Nome é obrigatório')
        .typeError('Nome deve ser do tipo string'),
    estado: yup
        .string()
        .min(2, 'Estado deve ter 2 caratéres')
        .max(2, 'Estado deve ter 2 caratéres')
        .required('Estado é obrigatório')
        .typeError('Estado deve ser do tipo string'),
});

export { bodyValidation };
