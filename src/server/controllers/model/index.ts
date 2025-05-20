import { bodyValidation } from './yup/BodyValidation';
import { IdValidation } from './yup/IdValidation';
import { queryValidation } from './yup/QueryValidation';
import { PBodyValidation } from './yup/PBodyValidation';

export const cidadeValidation = {
    bodyValidation,
    queryValidation,
    IdValidation,
};
export const pessoaValidation = {
    PBodyValidation,
    queryValidation,
    IdValidation,
};
