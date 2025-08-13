import { Router } from "express";
import { register, login } from '../controllers/auth.controller';

const router = Router();

// Endpoint de registro
router.post('/register', register);
// Endpoint de login
router.post('/login', login);

export default router;