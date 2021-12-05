import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import ProfessorController from '../controllers/ProfessorController';
import ParceiroController from '../controllers/ParceiroController';
import VantagemController from '../controllers/VantagemController';
import UsuarioController from '../controllers/UsuarioController';

const router = Router()

const usuarioController = new UsuarioController();
const alunoController = new AlunoController();
const professorController = new ProfessorController();
const parceiroController = new ParceiroController();
const vantagemController = new VantagemController();

router.post('/signin', usuarioController.signin)
router.post('/usuario', usuarioController.create)
router.get('/usuario/:id', usuarioController.get)
router.get('/usuario', usuarioController.getAll)
router.delete('/usuario/:id', usuarioController.delete)
router.put('/usuario/:id', usuarioController.update)

router.post('/aluno', alunoController.create)
router.get('/aluno/:id', alunoController.get)
router.get('/aluno', alunoController.getAll)
router.delete('/aluno/:id', alunoController.delete)
router.put('/aluno/:id', alunoController.update)

router.post('/professor', professorController.create)
router.get('/professor/:id', professorController.get)
router.get('/professor', professorController.getAll)
router.delete('/professor/:id', professorController.delete)
router.put('/professor/:id', professorController.update)
router.post('/professor/:id', professorController.enivarMoedas)
router.put('/professor', professorController.iniciarSemestre)

router.post('/parceiro', parceiroController.create)
router.get('/parceiro/:id', parceiroController.get)
router.get('/parceiro', parceiroController.getAll)
router.delete('/parceiro/:id', parceiroController.delete)
router.put('/parceiro/:id', parceiroController.update)

router.post('/vantagem', vantagemController.create)
router.get('/vantagem/:id', vantagemController.get)
router.get('/vantagem', vantagemController.getAll)
router.delete('/vantagem/:id', vantagemController.delete)
router.put('/vantagem/:id', vantagemController.update)
router.post('/vantagem/:id', vantagemController.comprar)


export default router;
