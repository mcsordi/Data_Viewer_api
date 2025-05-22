import { Router } from 'express';
import { cidadeController } from '../../controllers/cidade';
import { pessoaController } from '../../controllers/pessoa';
import { usuarioController } from '../../controllers/usuario';
import { ensureAuth } from '../middleware/EnsureAuth';

const router = Router();

router.get('/', (req, res) => {
    res.json(`your welcome`);
});

router.post(
    '/cidade',
    ensureAuth,
    cidadeController.createValidation,
    cidadeController.create
);
router.get(
    '/cidade',
    ensureAuth,
    cidadeController.getAllValidation,
    cidadeController.getAll
);
router.get(
    '/cidade/:id',
    ensureAuth,
    cidadeController.getByIdValidation,
    cidadeController.getById
);
router.put(
    '/cidade/:id',
    ensureAuth,
    cidadeController.updateValidation,
    cidadeController.update
);
router.delete(
    '/cidade/:id',
    ensureAuth,
    cidadeController.deleteValidation,
    cidadeController.deleteById
);

router.post(
    '/pessoa',
    ensureAuth,
    pessoaController.createValidation,
    pessoaController.create
);
router.get(
    '/pessoa',
    ensureAuth,
    pessoaController.getAllValidation,
    pessoaController.getAll
);
router.get(
    '/pessoa/:id',
    ensureAuth,
    pessoaController.getByIdValidation,
    pessoaController.getById
);
router.put(
    '/pessoa/:id',
    ensureAuth,
    pessoaController.updateValidation,
    pessoaController.update
);
router.delete(
    '/pessoa/:id',
    ensureAuth,
    pessoaController.deleteValidation,
    pessoaController.deleteById
);

router.post(
    '/cadastrar',
    usuarioController.signUpValidation,
    usuarioController.signUp
);
router.post(
    '/logar',
    usuarioController.signInValidation,
    usuarioController.signIn
);
router.put(
    '/usuario/:id',
    ensureAuth,
    usuarioController.updateValidation,
    usuarioController.update
);
router.delete(
    '/usuario/:id',
    ensureAuth,
    usuarioController.deleteValidation,
    usuarioController.deleteById
);

export { router };
