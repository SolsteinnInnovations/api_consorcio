"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Actualiza la ruta de importación del controlador
const perfiles_controller_1 = require("../controllers/perfiles.controller");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo perfil
router.post('/', perfiles_controller_1.crearPerfil);
// Ruta para obtener todos los perfiles
router.get('/', perfiles_controller_1.getPerfiles);
// Ruta para obtener un perfil por su ID
router.get('/:id', perfiles_controller_1.getPerfilById);
// Ruta para actualizar un perfil por su ID
router.put('/:id', perfiles_controller_1.actualizarPerfil);
// Ruta para deshabilitar (eliminación lógica) un perfil por su ID
router.delete('/:id', perfiles_controller_1.eliminarPerfil);
exports.default = router;
//# sourceMappingURL=perfiles.routes.js.map