/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { TIdParam } from '../../shared/types/IdParam';
import { TPeople } from '../../shared/types/People';
import { validation } from '../../shared/middleware/Validation';
import { peopleValidation } from '../validation';
import { IdValidation } from '../validation/pessoas/IdValidation';
import { StatusCodes } from 'http-status-codes';

const updateByIdValidation = validation({
  body: peopleValidation.validate,
  params: IdValidation,
});

const updateById = async (
  req: Request<TIdParam, {}, TPeople>,
  res: Response,
) => {
  //   const { id } = req.params;
  //   const data = req.body;
  //   const sql = `update pessoas set? where id = ${id}`;
  //   pessoasQuery(res, sql, data);
  res.status(StatusCodes.OK).json(req.body);
};
export { updateById, updateByIdValidation };
