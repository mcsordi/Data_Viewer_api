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

export { router };
