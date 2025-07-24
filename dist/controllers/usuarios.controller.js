"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.getUsuarioById = exports.getUsuarios = exports.crearUsuario = void 0;
// Actualiza la importación del modelo
const usuarios_model_1 = require("../models/usuarios.model");
const perfiles_model_1 = require("../models/perfiles.model"); // Necesitamos el modelo de Perfiles para validar
// --- Crear un nuevo Usuario ---
const crearUsuario = async (req, res) => {
    const { login, password, idPerfil } = req.body;
    try {
        // 1. Verificar si el login ya existe
        const existeLogin = await usuarios_model_1.UsuariosModel.findOne({ login });
        if (existeLogin) {
            return res.status(400).json({
                ok: false,
                msg: 'El login ya está registrado.'
            });
        }
        // 2. Verificar si el idPerfil es válido y existe
        const existePerfil = await perfiles_model_1.PerfilesModel.findById(idPerfil);
        if (!existePerfil) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de perfil proporcionado no existe.'
            });
        }
        const usuario = new usuarios_model_1.UsuariosModel(req.body); // Usa UsuariosModel
        // Si usas bcrypt para hashear la contraseña, el código iría aquí
        // Por ejemplo: usuario.password = bcrypt.hashSync(password, 10);
        await usuario.save();
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al crear el usuario.'
        });
    }
};
exports.crearUsuario = crearUsuario;
// --- Obtener todos los Usuarios ---
const getUsuarios = async (req, res) => {
    try {
        // Usa UsuariosModel y popular el campo idPerfil para obtener los datos del perfil
        const usuarios = await usuarios_model_1.UsuariosModel.find().populate('idPerfil', 'descripcion'); // Solo trae la descripción del perfil
        res.status(200).json({
            ok: true,
            usuarios
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al obtener los usuarios.'
        });
    }
};
exports.getUsuarios = getUsuarios;
// --- Obtener un Usuario por ID ---
const getUsuarioById = async (req, res) => {
    const id = req.params.id;
    try {
        // Usa UsuariosModel y popular el campo idPerfil
        const usuario = await usuarios_model_1.UsuariosModel.findById(id).populate('idPerfil', 'descripcion');
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al obtener el usuario.'
        });
    }
};
exports.getUsuarioById = getUsuarioById;
// --- Actualizar un Usuario ---
const actualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const { login, idPerfil, ...campos } = req.body; // Extraemos login, idPerfil y el resto de campos
    try {
        const usuarioDB = await usuarios_model_1.UsuariosModel.findById(id); // Usa UsuariosModel
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por ID.'
            });
        }
        // Si se intenta cambiar el login, verificar que el nuevo login no exista
        if (login && login !== usuarioDB.login) {
            const existeLogin = await usuarios_model_1.UsuariosModel.findOne({ login }); // Usa UsuariosModel
            if (existeLogin) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El nuevo login ya está registrado por otro usuario.'
                });
            }
            campos.login = login;
        }
        // Si se intenta cambiar el perfil, verificar que el nuevo idPerfil sea válido
        if (idPerfil && idPerfil !== String(usuarioDB.idPerfil)) { // Convertir a string para comparar ObjectId
            const existePerfil = await perfiles_model_1.PerfilesModel.findById(idPerfil);
            if (!existePerfil) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de perfil proporcionado no existe.'
                });
            }
            campos.idPerfil = idPerfil;
        }
        const usuarioActualizado = await usuarios_model_1.UsuariosModel.findByIdAndUpdate(id, campos, { new: true }); // Usa UsuariosModel
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al actualizar el usuario.'
        });
    }
};
exports.actualizarUsuario = actualizarUsuario;
// --- Eliminar/Deshabilitar un Usuario (borrado lógico) ---
const eliminarUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        const usuarioDB = await usuarios_model_1.UsuariosModel.findById(id); // Usa UsuariosModel
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por ID.'
            });
        }
        // Borrado lógico: cambiar el estado 'habilitado' a false
        usuarioDB.habilitado = false;
        await usuarioDB.save();
        res.status(200).json({
            ok: true,
            msg: 'Usuario deshabilitado exitosamente.',
            usuario: usuarioDB
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al deshabilitar el usuario.'
        });
    }
};
exports.eliminarUsuario = eliminarUsuario;
