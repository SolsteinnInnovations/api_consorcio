import { Router } from 'express';
import {
    crearParticipanteReunion,
    getParticipantesReuniones,
    getParticipanteReunionById,
    eliminarParticipanteReunion
} from '../controllers/participantesReuniones.controller';

const router = Router();

router.post('/', crearParticipanteReunion);
router.get('/', getParticipantesReuniones);
router.get('/:id', getParticipanteReunionById);
router.delete('/:id', eliminarParticipanteReunion); // No hay PUT para tablas de unión simples

export default router;