"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reclamosDepartamentos_controller_1 = require("../controllers/reclamosDepartamentos.controller");
const router = (0, express_1.Router)();
router.post('/', reclamosDepartamentos_controller_1.crearReclamoDepartamento);
router.get('/', reclamosDepartamentos_controller_1.getReclamosDepartamentos);
router.get('/:id', reclamosDepartamentos_controller_1.getReclamoDepartamentoById);
router.delete('/:id', reclamosDepartamentos_controller_1.eliminarReclamoDepartamento); // No hay PUT para tablas de unión simples
exports.default = router;
//# sourceMappingURL=reclamosDepartamentos.routes.js.map