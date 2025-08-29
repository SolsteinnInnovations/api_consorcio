"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localidades_controller_1 = require("../controllers/localidades.controller");
const router = (0, express_1.Router)();
router.post('/', localidades_controller_1.crearLocalidad);
router.post('/seed', localidades_controller_1.crearLocalidadBulk); // Ruta para insertar localidades en bloque
router.get('/', localidades_controller_1.getLocalidades);
router.get('/:id', localidades_controller_1.getLocalidadById);
router.put('/:id', localidades_controller_1.actualizarLocalidad);
router.delete('/:id', localidades_controller_1.eliminarLocalidad);
exports.default = router;
//# sourceMappingURL=localidades.routes.js.map