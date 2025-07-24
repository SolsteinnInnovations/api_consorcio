import { Router } from 'express';
import {
    crearHistoricoExpensa,
    getHistoricoExpensas,
    getHistoricoExpensaById,
    actualizarHistoricoExpensa,
    eliminarHistoricoExpensa
} from '../controllers/historicoExpensas.controller';

const router = Router();

router.post('/', crearHistoricoExpensa);
router.get('/', getHistoricoExpensas);
router.get('/:id', getHistoricoExpensaById);
router.put('/:id', actualizarHistoricoExpensa); // La actualización debería ser rara en históricos
router.delete('/:id', eliminarHistoricoExpensa);

export default router;