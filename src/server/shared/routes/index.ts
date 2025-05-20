import { Router } from 'express';
import { cidadeController } from '../../controllers/cidade';

const router = Router();

router.get('/', (req, res) => {
    res.json(`your welcome`);
});

router.post(
    '/cidade',
    cidadeController.createValidation,
    cidadeController.create
);
router.get(
    '/cidade',
    cidadeController.getAllValidation,
    cidadeController.getAll
);
router.get(
    '/cidade/:id',
    cidadeController.getByIdValidation,
    cidadeController.getById
);
router.put(
    '/cidade/:id',
    cidadeController.updateValidation,
    cidadeController.update
);
router.delete(
    '/cidade/:id',
    cidadeController.deleteValidation,
    cidadeController.deleteById
);

export { router };
