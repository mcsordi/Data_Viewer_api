/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { TIdParam } from '../../shared/types/IdParam';
import { validation } from '../../shared/middleware/Validation';
import { IdValidation } from '../validation/pessoas/IdValidation';
import { StatusCodes } from 'http-status-codes';

const deleteByIdValidation = validation({
  params: IdValidation,
});

const deleteByID = async (
  req: Request<TIdParam, {}, TIdParam>,
  res: Response,
) => {
  //   const id = req.params.id;
  //   const sql = `delete from pessoas where id = ${id}`;
  //   pessoasQuery(res, sql);
  res.status(StatusCodes.OK).json('Deletado');
};

export { deleteByID, deleteByIdValidation };
