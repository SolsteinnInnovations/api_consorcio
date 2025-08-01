"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perfilesPermisos_controller_1 = require("../controllers/perfilesPermisos.controller");
const router = (0, express_1.Router)();
router.post('/', perfilesPermisos_controller_1.crearPerfilPermiso);
router.get('/', perfilesPermisos_controller_1.getPerfilesPermisos);
router.get('/:id', perfilesPermisos_controller_1.getPerfilPermisoById);
router.put('/:id', perfilesPermisos_controller_1.actualizarPerfilPermiso);
router.delete('/:id', perfilesPermisos_controller_1.eliminarPerfilPermiso);
exports.default = router;
