/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware/Validation';
import { cidadeValidation } from '../../shared/model';
import { TCidade } from '../../shared/types/TCidade';
import { cidadeProvider } from '../../database/providers/cidade';
import { StatusCodes } from 'http-status-codes';

const createValidation = validation({ body: cidadeValidation.bodyValidation });

const create = async (req: Request<{}, {}, TCidade>, res: Response) => {
    const body = req.body;
    const created = await cidadeProvider.create(body);
    if (created instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: created.message } });
    }
    return res.status(StatusCodes.OK).json(created);
};
export { create, createValidation };
