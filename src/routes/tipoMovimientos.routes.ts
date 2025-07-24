import { Router } from 'express';
import {
    crearTipoMovimiento,
    getTiposMovimientos,
    getTipoMovimientoById,
    actualizarTipoMovimiento,
    eliminarTipoMovimiento
} from '../controllers/tipoMovimientos.controller';

const router = Router();

router.post('/', crearTipoMovimiento);
router.get('/', getTiposMovimientos);
router.get('/:id', getTipoMovimientoById);
router.put('/:id', actualizarTipoMovimiento);
router.delete('/:id', eliminarTipoMovimiento);

export default router;