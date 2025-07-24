import { Router } from 'express';
import {
    crearEdificio,
    getEdificios,
    getEdificioById,
    actualizarEdificio,
    eliminarEdificio
} from '../controllers/edificios.controller';

const router = Router();

router.post('/', crearEdificio);
router.get('/', getEdificios);
router.get('/:id', getEdificioById);
router.put('/:id', actualizarEdificio);
router.delete('/:id', eliminarEdificio);

export default router;