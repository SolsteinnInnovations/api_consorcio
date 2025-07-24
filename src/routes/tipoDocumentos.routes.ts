import { Router } from 'express';
import {
    crearTipoDocumento,
    getTiposDocumentos,
    getTipoDocumentoById,
    actualizarTipoDocumento,
    eliminarTipoDocumento
} from '../controllers/tipoDocumentos.controller';

const router = Router();

router.post('/', crearTipoDocumento);
router.get('/', getTiposDocumentos);
router.get('/:id', getTipoDocumentoById);
router.put('/:id', actualizarTipoDocumento);
router.delete('/:id', eliminarTipoDocumento);

export default router;