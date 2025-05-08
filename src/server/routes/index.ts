import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { cidadesController } from '../controller/cidades';
const router = Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json('Your welcome');
});

router.get('/cidades', cidadesController.getAll);

export { router };
