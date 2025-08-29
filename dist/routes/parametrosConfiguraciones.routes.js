"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Actualiza la ruta de importación del controlador
const parametrosConfiguraciones_controller_1 = require("../controllers/parametrosConfiguraciones.controller");
const router = (0, express_1.Router)();
// Ruta para crear un nuevo parámetro de configuración
router.post('/', parametrosConfiguraciones_controller_1.crearParametroConfiguracion);
// Ruta para obtener todos los parámetros de configuración
router.get('/', parametrosConfiguraciones_controller_1.getParametrosConfiguracion);
// Ruta para obtener un parámetro de configuración por su ID
router.get('/:id', parametrosConfiguraciones_controller_1.getParametroConfiguracionById);
// Ruta para actualizar un parámetro de configuración por su ID
router.put('/:id', parametrosConfiguraciones_controller_1.actualizarParametroConfiguracion);
// Ruta para eliminar un parámetro de configuración por su ID (borrado físico)
router.delete('/:id', parametrosConfiguraciones_controller_1.eliminarParametroConfiguracion);
exports.default = router;
//# sourceMappingURL=parametrosConfiguraciones.routes.js.map