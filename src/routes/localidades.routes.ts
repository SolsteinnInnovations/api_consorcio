import { Router } from 'express';
import {
    crearLocalidad,
    getLocalidades,
    getLocalidadById,
    actualizarLocalidad,
    eliminarLocalidad,
    crearLocalidadBulk
} from '../controllers/localidades.controller';


const router = Router();

router.post('/',  crearLocalidad);
router.post('/seed', crearLocalidadBulk); // Ruta para insertar localidades en bloque
router.get('/', getLocalidades);
router.get('/:id', getLocalidadById);
router.put('/:id', actualizarLocalidad);
router.delete('/:id', eliminarLocalidad);

export default router;