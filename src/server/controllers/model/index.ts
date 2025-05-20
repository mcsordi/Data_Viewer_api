import { bodyValidation } from './yup/BodyValidation';
import { IdValidation } from './yup/IdValidation';
import { queryValidation } from './yup/QueryValidation';

export const cidadeValidation = {
    bodyValidation,
    queryValidation,
    IdValidation,
};
