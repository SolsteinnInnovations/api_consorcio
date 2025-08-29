"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Actualiza la importación del modelo
const usuarios_model_1 = require("../models/usuarios.model");
const perfiles_model_1 = require("../models/perfiles.model"); // Necesitamos el modelo de Perfiles para validar
const edificios_model_1 = require("../models/edificios.model"); // Importa el modelo de Edificios
const register = async (req, res) => {
    const { login, password, idPerfil, idEdificio } = req.body;
    try {
        // Verifica si el login ya existe
        const existeLogin = await usuarios_model_1.UsuariosModel.findOne({ login });
        if (existeLogin) {
            return res.status(400).json({
                ok: false,
                msg: 'El login ya está registrado.'
            });
        }
        // Verifica si el perfil existe
        const existePerfil = await perfiles_model_1.PerfilesModel.findById(idPerfil);
        if (!existePerfil) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de perfil proporcionado no existe.'
            });
        }
        // Verifica si el edificio existe
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        // Hashea la contraseña
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        // Crea el usuario
        const usuario = new usuarios_model_1.UsuariosModel({
            login,
            password: hashedPassword,
            idPerfil,
            idEdificio // Guarda el idEdificio en el usuario
        });
        await usuario.save();
        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado exitosamente',
            usuario: {
                id: usuario._id,
                login: usuario.login,
                idPerfil: usuario.idPerfil,
                idEdificio: usuario.idEdificio
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar el usuario.'
        });
    }
};
exports.register = register;
// --- Login de usuario ---
const login = async (req, res) => {
    const { login, password } = req.body;
    try {
        // Busca el usuario por login
        const usuario = await usuarios_model_1.UsuariosModel.findOne({ login });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas.'
            });
        }
        // Verifica si el usuario está habilitado
        if (usuario.habilitado === false) {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario deshabilitado.'
            });
        }
        // Compara la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password || '');
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas.'
            });
        }
        // Genera un JWT (cambia 'secret' por tu clave secreta real)
        const token = jsonwebtoken_1.default.sign({ uid: usuario._id, login: usuario.login, idPerfil: usuario.idPerfil }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({
            ok: true,
            msg: 'Login exitoso',
            usuario: {
                id: usuario._id,
                login: usuario.login,
                idPerfil: usuario.idPerfil
            },
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al hacer login.'
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map