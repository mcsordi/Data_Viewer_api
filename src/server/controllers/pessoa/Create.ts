/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { pessoaValidation } from '../model';
import { StatusCodes } from 'http-status-codes';
import { pessoaProvider } from '../../database/providers/pessoa';
import { TPessoa } from '../../shared/types/TPessoa';

const createValidation = validation({ body: pessoaValidation.PBodyValidation });

const create = async (req: Request<{}, {}, TPessoa>, res: Response) => {
    const body = req.body;
    const created = await pessoaProvider.create(body);
    if (created instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: created.message } });
    }
    return res.status(StatusCodes.OK).json(created);
};
export { create, createValidation };
