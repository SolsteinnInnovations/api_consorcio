"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const espaciosComunes_controller_1 = require("../controllers/espaciosComunes.controller");
const router = (0, express_1.Router)();
router.post('/', espaciosComunes_controller_1.crearEspacioComun);
router.get('/', espaciosComunes_controller_1.getEspaciosComunes);
router.get('/:id', espaciosComunes_controller_1.getEspacioComunById);
router.put('/:id', espaciosComunes_controller_1.actualizarEspacioComun);
router.delete('/:id', espaciosComunes_controller_1.eliminarEspacioComun);
exports.default = router;
//# sourceMappingURL=espaciosComunes.routes.js.map