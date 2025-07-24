import { Request, Response } from 'express';
// Actualiza la importación del modelo
import { PerfilesModel, IPerfil } from '../models/perfiles.model';

// --- Crear un nuevo Perfil ---
const crearPerfil = async (req: Request, res: Response) => {
    const { descripcion } = req.body;

    try {
        const existePerfil = await PerfilesModel.findOne({ descripcion }); // Usa PerfilesModel
        if (existePerfil) {
            return res.status(400).json({
                ok: false,
                msg: 'El perfil con esa descripción ya existe.'
            });
        }

        const perfil = new PerfilesModel(req.body); // Usa PerfilesModel
        await perfil.save();

        res.status(201).json({
            ok: true,
            msg: 'Perfil creado exitosamente',
            perfil
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al crear el perfil.'
        });
    }
};

// --- Obtener todos los Perfiles (incluye deshabilitados) ---
const getPerfiles = async (req: Request, res: Response) => {
    try {
        const perfiles = await PerfilesModel.find(); // Usa PerfilesModel

        res.status(200).json({
            ok: true,
            perfiles
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al obtener los perfiles.'
        });
    }
};

// --- Obtener un Perfil por ID ---
const getPerfilById = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const perfil = await PerfilesModel.findById(id); // Usa PerfilesModel

        if (!perfil) {
            return res.status(404).json({
                ok: false,
                msg: 'Perfil no encontrado por ID.'
            });
        }

        res.status(200).json({
            ok: true,
            perfil
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al obtener el perfil.'
        });
    }
};

// --- Actualizar un Perfil ---
const actualizarPerfil = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;

    try {
        const perfilDB = await PerfilesModel.findById(id); // Usa PerfilesModel
        if (!perfilDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Perfil no encontrado por ID.'
            });
        }

        if (descripcion && descripcion !== perfilDB.descripcion) {
            const existeDescripcion = await PerfilesModel.findOne({ descripcion }); // Usa PerfilesModel
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un perfil con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }

        const perfilActualizado = await PerfilesModel.findByIdAndUpdate(id, campos, { new: true }); // Usa PerfilesModel

        res.status(200).json({
            ok: true,
            msg: 'Perfil actualizado exitosamente',
            perfil: perfilActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al actualizar el perfil.'
        });
    }
};

// --- Eliminar/Deshabilitar un Perfil (borrado lógico) ---
const eliminarPerfil = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const perfilDB = await PerfilesModel.findById(id); // Usa PerfilesModel
        if (!perfilDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Perfil no encontrado por ID.'
            });
        }

        perfilDB.habilitado = false;
        await perfilDB.save();

        res.status(200).json({
            ok: true,
            msg: 'Perfil deshabilitado exitosamente.',
            perfil: perfilDB
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablale al administrador: error al deshabilitar el perfil.'
        });
    }
};

export {
    crearPerfil,
    getPerfiles,
    getPerfilById,
    actualizarPerfil,
    eliminarPerfil
};