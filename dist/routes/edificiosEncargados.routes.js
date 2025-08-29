"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const edificiosEncargados_controller_1 = require("../controllers/edificiosEncargados.controller");
const router = (0, express_1.Router)();
router.post('/', edificiosEncargados_controller_1.crearEdificioEncargado);
router.get('/', edificiosEncargados_controller_1.getEdificiosEncargados);
router.get('/:id', edificiosEncargados_controller_1.getEdificioEncargadoById);
router.delete('/:id', edificiosEncargados_controller_1.eliminarEdificioEncargado); // Nota: No hay PUT para esta tabla transpuesta, solo crear/eliminar relaciones
exports.default = router;
//# sourceMappingURL=edificiosEncargados.routes.js.map