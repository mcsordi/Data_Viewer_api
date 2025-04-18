/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import * as yup from 'yup';
import { TIdParam } from '../../shared/types/IdParam';
import { IdValidation } from '../validation/pessoas/IdValidation';
import { StatusCodes } from 'http-status-codes';

type TGetAllParams = {
  page?: number;
  limit?: number;
  filter?: string;
};

const getAllValidation: yup.ObjectSchema<TGetAllParams> = yup.object().shape({
  page: yup
    .number()
    .positive('Page precisa ser maior do que 0')
    .typeError('Page precisa ser do tipo numero')
    .required('Page é requerido'),

  limit: yup
    .number()
    .positive('Limit precisa ser maior do que 0')
    .typeError('Limit precisa ser do tipo numero')
    .required('Limit é requerido'),
  filter: yup
    .string()
    .optional()
    .typeError('Filter precisa ser do tipo string'),
});

const getValidation = validation({
  query: getAllValidation,
});
const getIdValidation = validation({
  params: IdValidation,
});

const getAll = (req: Request<{}, {}, {}, TGetAllParams>, res: Response) => {
  //   const sql = `select * from pessoas`;
  //   pessoasQuery(res, sql);
  res.status(StatusCodes.OK).json('getAll');
};

const getByID = (req: Request<TIdParam>, res: Response) => {
  //   const id = req.params.id;
  //   const sql = `select * from pessoas where id = ${id}`;
  //   pessoasQuery(res, sql);
  res.status(StatusCodes.OK).json('getById');
};

export { getAll, getValidation, getByID, getIdValidation };
