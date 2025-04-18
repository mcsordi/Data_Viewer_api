import { StatusCodes } from 'http-status-codes';
import { connection } from '..';
import { TPeople } from '../../shared/types/People';
import { Response } from 'express';
import { ResultSetHeader } from 'mysql2';

const pessoasQuery = (res: Response, sql: string, body?: TPeople) => {
  connection.query(sql, body, (err, response: ResultSetHeader) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    } else if (
      response.affectedRows == 0 ||
      Object.entries(response).length == 0
    ) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'id não encontrado' });
    } else {
      res.status(StatusCodes.OK).json(response);
    }
  });
};

export { pessoasQuery };
