"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoMovimientos_controller_1 = require("../controllers/tipoMovimientos.controller");
const router = (0, express_1.Router)();
router.post('/', tipoMovimientos_controller_1.crearTipoMovimiento);
router.get('/', tipoMovimientos_controller_1.getTiposMovimientos);
router.get('/:id', tipoMovimientos_controller_1.getTipoMovimientoById);
router.put('/:id', tipoMovimientos_controller_1.actualizarTipoMovimiento);
router.delete('/:id', tipoMovimientos_controller_1.eliminarTipoMovimiento);
exports.default = router;
//# sourceMappingURL=tipoMovimientos.routes.js.map