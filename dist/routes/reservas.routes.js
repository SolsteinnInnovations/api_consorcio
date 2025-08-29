"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservas_controller_1 = require("../controllers/reservas.controller");
const router = (0, express_1.Router)();
router.post('/', reservas_controller_1.crearReserva);
router.get('/', reservas_controller_1.getReservas);
router.get('/:id', reservas_controller_1.getReservaById);
router.put('/:id', reservas_controller_1.actualizarReserva);
router.delete('/:id', reservas_controller_1.eliminarReserva);
exports.default = router;
//# sourceMappingURL=reservas.routes.js.map