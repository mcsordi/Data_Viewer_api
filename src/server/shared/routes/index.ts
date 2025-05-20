import { Router } from 'express';
import { cidadeController } from '../../controllers/cidade';
import { pessoaController } from '../../controllers/pessoa';

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

router.post(
    '/pessoa',
    pessoaController.createValidation,
    pessoaController.create
);
router.get(
    '/pessoa',
    pessoaController.getAllValidation,
    pessoaController.getAll
);
router.get(
    '/pessoa/:id',
    pessoaController.getByIdValidation,
    pessoaController.getById
);
router.put(
    '/pessoa/:id',
    pessoaController.updateValidation,
    pessoaController.update
);
router.delete(
    '/pessoa/:id',
    pessoaController.deleteValidation,
    pessoaController.deleteById
);

export { router };
