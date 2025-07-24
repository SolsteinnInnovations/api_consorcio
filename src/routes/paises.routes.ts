import { Router } from 'express';
import {
    crearPais,
    getPaises,
    getPaisById,
    actualizarPais,
    eliminarPais
} from '../controllers/paises.controller';

const router = Router();

router.post('/', crearPais);
router.get('/', getPaises);
router.get('/:id', getPaisById);
router.put('/:id', actualizarPais);
router.delete('/:id', eliminarPais);

export default router;