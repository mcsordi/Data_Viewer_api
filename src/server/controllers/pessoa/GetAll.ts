/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { TQuery } from '../../shared/types/TQuery';
import { StatusCodes } from 'http-status-codes';
import { pessoaProvider } from '../../database/providers/pessoa';
import { pessoaValidation } from '../model';

const getAllValidation = validation({
    query: pessoaValidation.queryValidation,
});
const getAll = async (req: Request<{}, {}, {}, TQuery>, res: Response) => {
    const { filter, limit, page } = req.query;
    const count = await pessoaProvider.count(filter || '');
    const getAll = await pessoaProvider.getAll(
        page || 1,
        limit || 7,
        filter || ''
    );
    if (count instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: count.message } });
    }
    if (getAll instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: getAll.message } });
    }
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(getAll);
};
export { getAllValidation, getAll };
