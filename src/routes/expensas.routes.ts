import { Router } from 'express';
import {
    crearExpensa,
    getExpensas,
    getExpensaById,
    actualizarExpensa,
    eliminarExpensa
} from '../controllers/expensas.controller';

const router = Router();

router.post('/', crearExpensa);
router.get('/', getExpensas);
router.get('/:id', getExpensaById);
router.put('/:id', actualizarExpensa);
router.delete('/:id', eliminarExpensa);

export default router;