import { Router } from 'express';
// Actualiza la ruta de importación del controlador
import {
    crearParametroConfiguracion,
    getParametrosConfiguracion,
    getParametroConfiguracionById,
    actualizarParametroConfiguracion,
    eliminarParametroConfiguracion
} from '../controllers/parametrosConfiguraciones.controller';

const router = Router();

// Ruta para crear un nuevo parámetro de configuración
router.post('/', crearParametroConfiguracion);

// Ruta para obtener todos los parámetros de configuración
router.get('/', getParametrosConfiguracion);

// Ruta para obtener un parámetro de configuración por su ID
router.get('/:id', getParametroConfiguracionById);

// Ruta para actualizar un parámetro de configuración por su ID
router.put('/:id', actualizarParametroConfiguracion);

// Ruta para eliminar un parámetro de configuración por su ID (borrado físico)
router.delete('/:id', eliminarParametroConfiguracion);

export default router;