import { Router } from 'express';
import {
    crearDepartamento,
    getDepartamentos,
    getDepartamentoById,
    actualizarDepartamento,
    eliminarDepartamento
} from '../controllers/departamentos.controller';

const router = Router();

router.post('/', crearDepartamento);
router.get('/', getDepartamentos);
router.get('/:id', getDepartamentoById);
router.put('/:id', actualizarDepartamento);
router.delete('/:id', eliminarDepartamento);

export default router;