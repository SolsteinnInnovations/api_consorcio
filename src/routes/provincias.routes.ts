import { Router } from 'express';
import {
    crearProvincia,
    getProvincias,
    getProvinciaById,
    actualizarProvincia,
    eliminarProvincia,
    bulkCrearProvincia
} from '../controllers/provincias.controller';

const router = Router();

router.post('/', crearProvincia);
router.post('/seed', bulkCrearProvincia);
router.get('/', getProvincias);
router.get('/:id', getProvinciaById);
router.put('/:id', actualizarProvincia);
router.delete('/:id', eliminarProvincia);

export default router;