import { Router } from 'express';
import {
    crearReclamo,
    getReclamos,
    getReclamoById,
    actualizarReclamo,
    eliminarReclamo
} from '../controllers/reclamos.controller';

const router = Router();

router.post('/', crearReclamo);
router.get('/', getReclamos);
router.get('/:id', getReclamoById);
router.put('/:id', actualizarReclamo);
router.delete('/:id', eliminarReclamo);

export default router;