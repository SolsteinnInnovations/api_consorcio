import { Router } from 'express';
// Actualiza la ruta de importación del controlador
import { crearPerfil, getPerfiles, getPerfilById, actualizarPerfil, eliminarPerfil } from '../controllers/perfiles.controller';

const router = Router();

// Ruta para crear un nuevo perfil
router.post('/', crearPerfil);

// Ruta para obtener todos los perfiles
router.get('/', getPerfiles);

// Ruta para obtener un perfil por su ID
router.get('/:id', getPerfilById);

// Ruta para actualizar un perfil por su ID
router.put('/:id', actualizarPerfil);

// Ruta para deshabilitar (eliminación lógica) un perfil por su ID
router.delete('/:id', eliminarPerfil);

export default router;