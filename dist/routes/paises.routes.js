"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paises_controller_1 = require("../controllers/paises.controller");
const router = (0, express_1.Router)();
router.post('/', paises_controller_1.crearPais);
router.post('/seed', paises_controller_1.seedPais);
router.get('/', paises_controller_1.getPaises);
router.get('/:id', paises_controller_1.getPaisById);
router.put('/:id', paises_controller_1.actualizarPais);
router.delete('/:id', paises_controller_1.eliminarPais);
exports.default = router;
//# sourceMappingURL=paises.routes.js.map