import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'query' | 'params';

type TSchema = Record<TProperty, AnyObjectSchema>;

type TAllSchemas = (getSchemas: Partial<TSchema>) => RequestHandler;

const validation: TAllSchemas = (getSchemas) => async (req, res, next) => {
    const validationErrors: Record<string, Record<string, string>> = {};
    Object.entries(getSchemas).map(([key, schema]) => {
        try {
            return schema.validateSync(req[key as TProperty], {
                abortEarly: false,
            });
        } catch (error) {
            const yupErrors = error as ValidationError;
            const errors: Record<string, string> = {};
            yupErrors.inner.map((err) => {
                if (!err.path) return;
                errors[err.path] = err.message;
            });
            validationErrors[key] = errors;
        }
    });
    if (Object.entries(validationErrors).length === 0) {
        return next();
    } else {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: validationErrors });
    }
};
export { validation };
