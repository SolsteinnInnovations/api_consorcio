import { Router } from 'express';
import {
    crearProvincia,
    getProvincias,
    getProvinciaById,
    actualizarProvincia,
    eliminarProvincia
} from '../controllers/provincias.controller';

const router = Router();

router.post('/', crearProvincia);
router.get('/', getProvincias);
router.get('/:id', getProvinciaById);
router.put('/:id', actualizarProvincia);
router.delete('/:id', eliminarProvincia);

export default router;