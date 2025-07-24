import { Router } from 'express';
import {
    crearEspacioComun,
    getEspaciosComunes,
    getEspacioComunById,
    actualizarEspacioComun,
    eliminarEspacioComun
} from '../controllers/espaciosComunes.controller';

const router = Router();

router.post('/', crearEspacioComun);
router.get('/', getEspaciosComunes);
router.get('/:id', getEspacioComunById);
router.put('/:id', actualizarEspacioComun);
router.delete('/:id', eliminarEspacioComun);

export default router;