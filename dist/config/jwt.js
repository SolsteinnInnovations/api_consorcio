"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_model_1 = require("../models/usuarios.model");
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (payload) => {
    return jsonwebtoken_1.default.verify(payload, process.env.JWT_SECRET);
};
exports.verifyToken = verifyToken;
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = (0, exports.verifyToken)(token);
        let user;
        if (typeof decoded === 'object' && 'uid' in decoded) {
            user = await usuarios_model_1.UsuariosModel.findById(decoded.uid).select('-password');
        }
        else {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid token user' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=jwt.js.map