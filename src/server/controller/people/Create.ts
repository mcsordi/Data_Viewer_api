/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { TPeople } from '../../shared/types/People';
import { validation } from '../../shared/middleware/Validation';
import { peopleValidation } from '../validation';
import { StatusCodes } from 'http-status-codes';

export const createValidations = validation({
  body: peopleValidation.validate,
});

const create = (req: Request<{}, {}, TPeople>, res: Response) => {
  //   const sql = `insert into pessoas set?`;
  //   const bodyData = req.body;
  res.status(StatusCodes.OK).json(req.body);
};

export { create };
