import { Router } from 'express';
const router = Router()

import UsuarioController from '../controllers/UsuarioController';

const usuarioController = new UsuarioController();

router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', usuarioController.get)
router.get('/usuario', usuarioController.getAll)
router.delete('/usuario/:id', usuarioController.delete)
router.put('/usuario/:id', usuarioController.update)


export default router;
