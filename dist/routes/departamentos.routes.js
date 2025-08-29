"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentos_controller_1 = require("../controllers/departamentos.controller");
const router = (0, express_1.Router)();
router.post('/', departamentos_controller_1.crearDepartamento);
router.get('/', departamentos_controller_1.getDepartamentos);
router.get('/:id', departamentos_controller_1.getDepartamentoById);
router.put('/:id', departamentos_controller_1.actualizarDepartamento);
router.delete('/:id', departamentos_controller_1.eliminarDepartamento);
exports.default = router;
//# sourceMappingURL=departamentos.routes.js.map