import { Router } from 'express';
import {
    crearCajaMovimiento,
    getCajaMovimientos,
    getCajaMovimientoById,
    actualizarCajaMovimiento,
    eliminarCajaMovimiento,
    getSaldoCajaByEdificio
} from '../controllers/cajaMovimientos.controller';

const router = Router();

router.post('/', crearCajaMovimiento);
router.get('/', getCajaMovimientos);
router.get('/:id', getCajaMovimientoById);
router.put('/:id', actualizarCajaMovimiento);
router.delete('/:id', eliminarCajaMovimiento);

// Nueva ruta para obtener el saldo de caja por edificio
router.get('/saldo-por-edificio/:idEdificio', getSaldoCajaByEdificio);

export default router;