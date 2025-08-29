"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participantesReuniones_controller_1 = require("../controllers/participantesReuniones.controller");
const router = (0, express_1.Router)();
router.post('/', participantesReuniones_controller_1.crearParticipanteReunion);
router.get('/', participantesReuniones_controller_1.getParticipantesReuniones);
router.get('/:id', participantesReuniones_controller_1.getParticipanteReunionById);
router.delete('/:id', participantesReuniones_controller_1.eliminarParticipanteReunion); // No hay PUT para tablas de unión simples
exports.default = router;
//# sourceMappingURL=participantesReuniones.routes.js.map