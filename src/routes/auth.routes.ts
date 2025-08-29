import { Router } from "express";
import { register, login } from '../controllers/auth.controller';
import { body } from "express-validator";
import { validationMiddleware } from "../middlewares/validationResult";

const router = Router();
// const { login, password, idPerfil, idEdificio } = req.body;
// Endpoint de registro
router.post('/register', [
    body('login').isString().notEmpty().withMessage('El login no puede ir vacio'),
    body('password').isString().notEmpty().withMessage('La password no puede estar vacia'),
    body('password').isLength({min:8}).withMessage('La password debe tener al menos 8 caracteres'),
    body('idPerfil').isMongoId().withMessage('El idPerfil debe ser un ID de Mongo válido'),
    body('idEdificio').isMongoId().withMessage('El idEdificio debe ser un ID de Mongo válido'),
    validationMiddleware
], register);
// Endpoint de login
router.post('/login',[
    body('login').isString().notEmpty().withMessage('El login no puede ir vacio'),
    body('password').isString().notEmpty().withMessage('La password no puede estar vacia'),
    body('password').isLength({min:8}).withMessage('La password debe tener al menos 8 caracteres'),
    validationMiddleware
], login);

export default router;