import { Router } from 'express';
import {
    crearPerfilPermiso,
    getPerfilesPermisos,
    getPerfilPermisoById,
    actualizarPerfilPermiso,
    eliminarPerfilPermiso
} from '../controllers/perfilesPermisos.controller';

const router = Router();

router.post('/', crearPerfilPermiso);
router.get('/', getPerfilesPermisos);
router.get('/:id', getPerfilPermisoById);
router.put('/:id', actualizarPerfilPermiso);
router.delete('/:id', eliminarPerfilPermiso);

export default router;