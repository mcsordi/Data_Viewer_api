import * as yup from 'yup';

import { TQuery } from '../../../shared/types/TQuery';
const queryValidation: yup.ObjectSchema<TQuery> = yup.object().shape({
    page: yup
        .number()
        .optional()
        .moreThan(0, 'Page deve ser maior do que 0')
        .integer('Page deve ser um número inteiro')
        .typeError('Page deve ser um número'),
    limit: yup
        .number()
        .optional()
        .moreThan(0, 'limit deve ser maior do que 0')
        .integer('limit deve ser um número inteiro')
        .typeError('limit deve ser um número'),
    filter: yup.string().optional().typeError('Filter deve ser do tipo string'),
});

export { queryValidation };
