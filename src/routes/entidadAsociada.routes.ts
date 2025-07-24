import { Router } from 'express';
import {
    crearEntidadAsociada,
    getEntidadesAsociadas,
    getEntidadAsociadaById,
    actualizarEntidadAsociada,
    eliminarEntidadAsociada
} from '../controllers/entidadAsociada.controller';

const router = Router();

router.post('/', crearEntidadAsociada);
router.get('/', getEntidadesAsociadas);
router.get('/:id', getEntidadAsociadaById);
router.put('/:id', actualizarEntidadAsociada);
router.delete('/:id', eliminarEntidadAsociada);

export default router;