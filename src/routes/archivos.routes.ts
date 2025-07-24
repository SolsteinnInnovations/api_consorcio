import { Router } from 'express';
import {
    crearArchivo,
    getArchivos,
    getArchivoById,
    actualizarArchivo,
    eliminarArchivo
} from '../controllers/archivos.controller';

const router = Router();

router.post('/', crearArchivo);
router.get('/', getArchivos);
router.get('/:id', getArchivoById);
router.put('/:id', actualizarArchivo);
router.delete('/:id', eliminarArchivo);

export default router;