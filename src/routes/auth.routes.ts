import { Router } from "express";
import { register, login } from '../controllers/auth.controller';
import { body } from "express-validator";
import { validationMiddleware } from "../middlewares/validationResult";

const router = Router();
// const { login, password, idPerfil, idEdificio } = req.body;
// Endpoint de registro
router.post('/register', [
    body('email').isEmail().notEmpty().withMessage('Eso no es un email válido'),
    body('password').isString().notEmpty().withMessage('La password no puede estar vacia'),
    body('password').isLength({min:8}).withMessage('La password debe tener al menos 8 caracteres'),
    body('idPerfil').isMongoId().withMessage('El idPerfil debe ser un ID de Mongo válido'),
    body('idEdificio').isMongoId().withMessage('El idEdificio debe ser un ID de Mongo válido'),
    validationMiddleware
], register);
// Endpoint de login
router.post('/login',[
    body('email').isEmail().notEmpty().withMessage('Eso no es un email válido'),
    body('password').isString().notEmpty().withMessage('La password no puede estar vacia'),
    body('password').isLength({min:8}).withMessage('La password debe tener al menos 8 caracteres'),
    validationMiddleware
], login);

export default router;