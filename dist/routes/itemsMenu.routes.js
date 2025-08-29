"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsMenu_controller_1 = require("../controllers/itemsMenu.controller");
const router = (0, express_1.Router)();
router.post('/', itemsMenu_controller_1.crearItemMenu);
router.get('/', itemsMenu_controller_1.getItemsMenu);
router.get('/:id', itemsMenu_controller_1.getItemMenuById);
router.put('/:id', itemsMenu_controller_1.actualizarItemMenu);
router.delete('/:id', itemsMenu_controller_1.eliminarItemMenu);
exports.default = router;
//# sourceMappingURL=itemsMenu.routes.js.map