"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historicoExpensas_controller_1 = require("../controllers/historicoExpensas.controller");
const router = (0, express_1.Router)();
router.post('/', historicoExpensas_controller_1.crearHistoricoExpensa);
router.get('/', historicoExpensas_controller_1.getHistoricoExpensas);
router.get('/:id', historicoExpensas_controller_1.getHistoricoExpensaById);
router.put('/:id', historicoExpensas_controller_1.actualizarHistoricoExpensa); // La actualización debería ser rara en históricos
router.delete('/:id', historicoExpensas_controller_1.eliminarHistoricoExpensa);
exports.default = router;
