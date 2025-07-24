import { Router } from 'express';
import {
    crearReserva,
    getReservas,
    getReservaById,
    actualizarReserva,
    eliminarReserva
} from '../controllers/reservas.controller';

const router = Router();

router.post('/', crearReserva);
router.get('/', getReservas);
router.get('/:id', getReservaById);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);

export default router;