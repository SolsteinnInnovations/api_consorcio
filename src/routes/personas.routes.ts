import { Router } from 'express';
import {
    crearPersona,
    getPersonas,
    getPersonaById,
    actualizarPersona,
    eliminarPersona
} from '../controllers/personas.controller';

const router = Router();

router.post('/', crearPersona);
router.get('/', getPersonas);
router.get('/:id', getPersonaById);
router.put('/:id', actualizarPersona);
router.delete('/:id', eliminarPersona);

export default router;