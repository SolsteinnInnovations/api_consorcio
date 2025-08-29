"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cajaMovimientos_controller_1 = require("../controllers/cajaMovimientos.controller");
const router = (0, express_1.Router)();
router.post('/', cajaMovimientos_controller_1.crearCajaMovimiento);
router.get('/', cajaMovimientos_controller_1.getCajaMovimientos);
router.get('/:id', cajaMovimientos_controller_1.getCajaMovimientoById);
router.put('/:id', cajaMovimientos_controller_1.actualizarCajaMovimiento);
router.delete('/:id', cajaMovimientos_controller_1.eliminarCajaMovimiento);
// Nueva ruta para obtener el saldo de caja por edificio
router.get('/saldo-por-edificio/:idEdificio', cajaMovimientos_controller_1.getSaldoCajaByEdificio);
exports.default = router;
//# sourceMappingURL=cajaMovimientos.routes.js.map