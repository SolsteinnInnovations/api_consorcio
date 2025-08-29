"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entidadAsociada_controller_1 = require("../controllers/entidadAsociada.controller");
const router = (0, express_1.Router)();
router.post('/', entidadAsociada_controller_1.crearEntidadAsociada);
router.get('/', entidadAsociada_controller_1.getEntidadesAsociadas);
router.get('/:id', entidadAsociada_controller_1.getEntidadAsociadaById);
router.put('/:id', entidadAsociada_controller_1.actualizarEntidadAsociada);
router.delete('/:id', entidadAsociada_controller_1.eliminarEntidadAsociada);
exports.default = router;
//# sourceMappingURL=entidadAsociada.routes.js.map