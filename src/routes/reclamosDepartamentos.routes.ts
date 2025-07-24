import { Router } from 'express';
import {
    crearReclamoDepartamento,
    getReclamosDepartamentos,
    getReclamoDepartamentoById,
    eliminarReclamoDepartamento
} from '../controllers/reclamosDepartamentos.controller';

const router = Router();

router.post('/', crearReclamoDepartamento);
router.get('/', getReclamosDepartamentos);
router.get('/:id', getReclamoDepartamentoById);
router.delete('/:id', eliminarReclamoDepartamento); // No hay PUT para tablas de unión simples

export default router;