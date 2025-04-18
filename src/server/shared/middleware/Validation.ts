import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

type TProperties = 'body' | 'header' | 'params' | 'query';

type TAllSchemas = (
  schemas: Record<TProperties, ObjectSchema<AnyObject>>,
) => RequestHandler;

const validation: TAllSchemas = (schemas) => (req, res, next) => {
  const validationErrors: Record<string, Record<string, string>> = {};
  Object.entries(schemas).map(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperties], { abortEarly: false });
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
    res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
  }
};

export { validation };
