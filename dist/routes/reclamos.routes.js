"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reclamos_controller_1 = require("../controllers/reclamos.controller");
const router = (0, express_1.Router)();
router.post('/', reclamos_controller_1.crearReclamo);
router.get('/', reclamos_controller_1.getReclamos);
router.get('/:id', reclamos_controller_1.getReclamoById);
router.put('/:id', reclamos_controller_1.actualizarReclamo);
router.delete('/:id', reclamos_controller_1.eliminarReclamo);
exports.default = router;
//# sourceMappingURL=reclamos.routes.js.map