import { Router } from 'express';
import {
    crearActaReunion,
    getActasReuniones,
    getActaReunionById,
    actualizarActaReunion,
    eliminarActaReunion
} from '../controllers/actasReuniones.controller';

const router = Router();

router.post('/', crearActaReunion);
router.get('/', getActasReuniones);
router.get('/:id', getActaReunionById);
router.put('/:id', actualizarActaReunion);
router.delete('/:id', eliminarActaReunion);

export default router;