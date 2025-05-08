import { Request, Response } from 'express';
import { cidadesProvider } from '../../database/provider/cidades';
import { StatusCodes } from 'http-status-codes';

const getAll = async (req: Request, res: Response) => {
  const get = await cidadesProvider.getAll(1, 7, '');
  if (get instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: get.message } });
  }
  return res.status(StatusCodes.OK).json(get);
};
export { getAll };
