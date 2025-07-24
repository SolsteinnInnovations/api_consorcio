import { Router } from 'express';
import {
    crearPermiso,
    getPermisos,
    getPermisoById,
    actualizarPermiso,
    eliminarPermiso
} from '../controllers/permisos.controller';

const router = Router();

router.post('/', crearPermiso);
router.get('/', getPermisos);
router.get('/:id', getPermisoById);
router.put('/:id', actualizarPermiso);
router.delete('/:id', eliminarPermiso);

export default router;