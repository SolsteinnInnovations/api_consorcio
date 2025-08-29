import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Actualiza la importación del modelo
import { UsuariosModel, IUsuario } from '../models/usuarios.model';
import { PerfilesModel } from '../models/perfiles.model'; // Necesitamos el modelo de Perfiles para validar

// --- Crear un nuevo Usuario ---
const crearUsuario = async (req: Request, res: Response) => {
    const { email, password, idPerfil } = req.body;

    try {
        // 1. Verificar si el email ya existe
        const existeLogin = await UsuariosModel.findOne({ email });
        if (existeLogin) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado.'
            });
        }

        // 2. Verificar si el idPerfil es válido y existe
        const existePerfil = await PerfilesModel.findById(idPerfil);
        if (!existePerfil) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de perfil proporcionado no existe.'
            });
        }

        // Hashea la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const usuario = new UsuariosModel({
            email,
            password: hashedPassword,
            idPerfil
        }); // Usa UsuariosModel

        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            usuario: {
                id: usuario._id,
                email: usuario.email,
                idPerfil: usuario.idPerfil
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al crear el usuario.'
        });
    }
};

// --- Obtener todos los Usuarios ---
const getUsuarios = async (req: Request, res: Response) => {
    try {
        // Usa UsuariosModel y popular el campo idPerfil para obtener los datos del perfil
        const usuarios = await UsuariosModel.find().populate('idPerfil', 'descripcion'); // Solo trae la descripción del perfil

        res.status(200).json({
            ok: true,
            usuarios
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al obtener los usuarios.'
        });
    }
};

// --- Obtener un Usuario por ID ---
const getUsuarioById = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        // Usa UsuariosModel y popular el campo idPerfil
        const usuario = await UsuariosModel.findById(id).populate('idPerfil', 'descripcion');

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

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al obtener el usuario.'
        });
    }
};

// --- Actualizar un Usuario ---
const actualizarUsuario = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { email, idPerfil, ...campos } = req.body; // Extraemos login, idPerfil y el resto de campos

    try {
        const usuarioDB = await UsuariosModel.findById(id); // Usa UsuariosModel
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por ID.'
            });
        }

        // Si se intenta cambiar el login, verificar que el nuevo login no exista
        if (email && email !== usuarioDB.email) {
            const existeLogin = await UsuariosModel.findOne({ email }); // Usa UsuariosModel
            if (existeLogin) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El nuevo email ya está registrado por otro usuario.'
                });
            }
            campos.email = email;
        }

        // Si se intenta cambiar el perfil, verificar que el nuevo idPerfil sea válido
        if (idPerfil && idPerfil !== String(usuarioDB.idPerfil)) { // Convertir a string para comparar ObjectId
            const existePerfil = await PerfilesModel.findById(idPerfil);
            if (!existePerfil) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de perfil proporcionado no existe.'
                });
            }
            campos.idPerfil = idPerfil;
        }

        const usuarioActualizado = await UsuariosModel.findByIdAndUpdate(id, campos, { new: true }); // Usa UsuariosModel

        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al actualizar el usuario.'
        });
    }
};

// --- Eliminar/Deshabilitar un Usuario (borrado lógico) ---
const eliminarUsuario = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const usuarioDB = await UsuariosModel.findById(id); // Usa UsuariosModel
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

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al deshabilitar el usuario.'
        });
    }
};

// --- Registro de usuario ---


export {
    crearUsuario,
    getUsuarios,
    getUsuarioById,
    actualizarUsuario,
    eliminarUsuario,
   
};