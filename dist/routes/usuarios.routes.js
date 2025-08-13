"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Actualiza la ruta de importación del controlador
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo usuario
router.post('/', usuarios_controller_1.crearUsuario);
// Ruta para obtener todos los usuarios
router.get('/', usuarios_controller_1.getUsuarios);
// Ruta para obtener un usuario por su ID
router.get('/:id', usuarios_controller_1.getUsuarioById);
// Ruta para actualizar un usuario por su ID
router.put('/:id', usuarios_controller_1.actualizarUsuario);
// Ruta para deshabilitar (eliminación lógica) un usuario por su ID
router.delete('/:id', usuarios_controller_1.eliminarUsuario);
exports.default = router;
