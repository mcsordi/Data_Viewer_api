import { Router } from 'express';

import { peopleController } from '../controller';

const router = Router();

router.get('/pessoas', peopleController.getValidation, peopleController.getAll);

router.get(
  '/pessoas/:id',
  peopleController.getIdValidation,
  peopleController.getByID,
);

router.post(
  '/pessoas',
  peopleController.createValidations,
  peopleController.create,
);

router.delete(
  '/pessoas/:id',
  peopleController.deleteByIdValidation,
  peopleController.deleteByID,
);

router.put(
  '/pessoas/:id',
  peopleController.updateByIdValidation,
  peopleController.updateById,
);

export { router };
