"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actasReuniones_controller_1 = require("../controllers/actasReuniones.controller");
const router = (0, express_1.Router)();
router.post('/', actasReuniones_controller_1.crearActaReunion);
router.get('/', actasReuniones_controller_1.getActasReuniones);
router.get('/:id', actasReuniones_controller_1.getActaReunionById);
router.put('/:id', actasReuniones_controller_1.actualizarActaReunion);
router.delete('/:id', actasReuniones_controller_1.eliminarActaReunion);
exports.default = router;
//# sourceMappingURL=actasReuniones.routes.js.map