import { Router } from 'express';
import {
    crearTipoArchivo,
    getTiposArchivos,
    getTipoArchivoById,
    actualizarTipoArchivo,
    eliminarTipoArchivo
} from '../controllers/tipoArchivos.controller';

const router = Router();

router.post('/', crearTipoArchivo);
router.get('/', getTiposArchivos);
router.get('/:id', getTipoArchivoById);
router.put('/:id', actualizarTipoArchivo);
router.delete('/:id', eliminarTipoArchivo);

export default router;