"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivos_controller_1 = require("../controllers/archivos.controller");
const router = (0, express_1.Router)();
router.post('/', archivos_controller_1.crearArchivo);
router.get('/', archivos_controller_1.getArchivos);
router.get('/:id', archivos_controller_1.getArchivoById);
router.put('/:id', archivos_controller_1.actualizarArchivo);
router.delete('/:id', archivos_controller_1.eliminarArchivo);
exports.default = router;
//# sourceMappingURL=archivos.routes.js.map