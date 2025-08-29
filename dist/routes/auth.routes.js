"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const validationResult_1 = require("../middlewares/validationResult");
const router = (0, express_1.Router)();
// const { login, password, idPerfil, idEdificio } = req.body;
// Endpoint de registro
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().notEmpty().withMessage('Eso no es un email válido'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('La password no puede estar vacia'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('La password debe tener al menos 8 caracteres'),
    (0, express_validator_1.body)('idPerfil').isMongoId().withMessage('El idPerfil debe ser un ID de Mongo válido'),
    (0, express_validator_1.body)('idEdificio').isMongoId().withMessage('El idEdificio debe ser un ID de Mongo válido'),
    validationResult_1.validationMiddleware
], auth_controller_1.register);
// Endpoint de login
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().notEmpty().withMessage('Eso no es un email válido'),
    (0, express_validator_1.body)('password').isString().notEmpty().withMessage('La password no puede estar vacia'),
    (0, express_validator_1.body)('password').isLength({ min: 8 }).withMessage('La password debe tener al menos 8 caracteres'),
    validationResult_1.validationMiddleware
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map