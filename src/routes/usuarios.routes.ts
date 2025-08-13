import { Router } from 'express';
// Actualiza la ruta de importación del controlador
import {
    crearUsuario,
    getUsuarios,
    getUsuarioById,
    actualizarUsuario,
    eliminarUsuario,
  
} from '../controllers/usuarios.controller';

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/:id', getUsuarioById);

// Ruta para actualizar un usuario por su ID
router.put('/:id', actualizarUsuario);

// Ruta para deshabilitar (eliminación lógica) un usuario por su ID
router.delete('/:id', eliminarUsuario);


export default router;