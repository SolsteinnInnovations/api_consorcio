"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPerfilPermiso = exports.actualizarPerfilPermiso = exports.getPerfilPermisoById = exports.getPerfilesPermisos = exports.crearPerfilPermiso = void 0;
const perfilesPermisos_model_1 = require("../models/perfilesPermisos.model");
const perfiles_model_1 = require("../models/perfiles.model"); // Para validar idPerfil
const permisos_model_1 = require("../models/permisos.model"); // Para validar idPermiso
const crearPerfilPermiso = async (req, res) => {
    const { idPerfil, idPermiso } = req.body;
    try {
        // Verificar que el idPerfil y el idPermiso existan
        const existePerfil = await perfiles_model_1.PerfilesModel.findById(idPerfil);
        if (!existePerfil) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de perfil proporcionado no existe.'
            });
        }
        const existePermiso = await permisos_model_1.PermisosModel.findById(idPermiso);
        if (!existePermiso) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de permiso proporcionado no existe.'
            });
        }
        // Verificar si la combinación perfil-permiso ya existe y está habilitada
        const existePerfilPermiso = await perfilesPermisos_model_1.PerfilesPermisosModel.findOne({ idPerfil, idPermiso });
        if (existePerfilPermiso) {
            if (existePerfilPermiso.habilitado) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este permiso ya está asignado y habilitado para este perfil.'
                });
            }
            else {
                // Si existe pero está deshabilitado, lo re-habilitamos
                existePerfilPermiso.habilitado = true;
                await existePerfilPermiso.save();
                return res.status(200).json({
                    ok: true,
                    msg: 'Permiso re-habilitado para el perfil.',
                    perfilPermiso: existePerfilPermiso
                });
            }
        }
        const perfilPermiso = new perfilesPermisos_model_1.PerfilesPermisosModel(req.body);
        await perfilPermiso.save();
        res.status(201).json({
            ok: true,
            msg: 'Permiso asignado al perfil exitosamente',
            perfilPermiso
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al asignar el permiso al perfil.'
        });
    }
};
exports.crearPerfilPermiso = crearPerfilPermiso;
const getPerfilesPermisos = async (req, res) => {
    try {
        // Popula tanto el perfil como el permiso, y del permiso también el idItemMenu
        const perfilesPermisos = await perfilesPermisos_model_1.PerfilesPermisosModel.find()
            .populate('idPerfil', 'descripcion')
            .populate({
            path: 'idPermiso',
            select: 'descripcion idItemMenu', // Campos a seleccionar del permiso
            populate: {
                path: 'idItemMenu',
                select: 'descripcion' // Campos a seleccionar del itemMenu
            }
        });
        res.status(200).json({
            ok: true,
            perfilesPermisos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las asignaciones de permisos.'
        });
    }
};
exports.getPerfilesPermisos = getPerfilesPermisos;
const getPerfilPermisoById = async (req, res) => {
    const id = req.params.id;
    try {
        const perfilPermiso = await perfilesPermisos_model_1.PerfilesPermisosModel.findById(id)
            .populate('idPerfil', 'descripcion')
            .populate({
            path: 'idPermiso',
            select: 'descripcion idItemMenu',
            populate: {
                path: 'idItemMenu',
                select: 'descripcion'
            }
        });
        if (!perfilPermiso) {
            return res.status(404).json({
                ok: false,
                msg: 'Asignación de permiso a perfil no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            perfilPermiso
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la asignación de permiso.'
        });
    }
};
exports.getPerfilPermisoById = getPerfilPermisoById;
const actualizarPerfilPermiso = async (req, res) => {
    const id = req.params.id;
    const { idPerfil, idPermiso, ...campos } = req.body;
    try {
        const perfilPermisoDB = await perfilesPermisos_model_1.PerfilesPermisosModel.findById(id);
        if (!perfilPermisoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Asignación de permiso a perfil no encontrada por ID.'
            });
        }
        // Si se intenta cambiar idPerfil o idPermiso, se debería crear una nueva entrada
        // o manejarlo como un error, ya que la combinación es única.
        // Aquí, simplemente no permitiremos cambiar idPerfil o idPermiso via PUT si la combinación es única.
        // Si no quieres que puedan cambiar idPerfil o idPermiso, simplemente no los incluyas en campos para la actualización.
        if (idPerfil && String(idPerfil) !== String(perfilPermisoDB.idPerfil)) {
            return res.status(400).json({ ok: false, msg: 'No se permite cambiar el perfil de una asignación existente.' });
        }
        if (idPermiso && String(idPermiso) !== String(perfilPermisoDB.idPermiso)) {
            return res.status(400).json({ ok: false, msg: 'No se permite cambiar el permiso de una asignación existente.' });
        }
        const perfilPermisoActualizado = await perfilesPermisos_model_1.PerfilesPermisosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Asignación de permiso a perfil actualizada exitosamente',
            perfilPermiso: perfilPermisoActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la asignación de permiso.'
        });
    }
};
exports.actualizarPerfilPermiso = actualizarPerfilPermiso;
const eliminarPerfilPermiso = async (req, res) => {
    const id = req.params.id;
    try {
        const perfilPermisoDB = await perfilesPermisos_model_1.PerfilesPermisosModel.findById(id);
        if (!perfilPermisoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Asignación de permiso a perfil no encontrada por ID.'
            });
        }
        perfilPermisoDB.habilitado = false; // Borrado lógico
        await perfilPermisoDB.save();
        res.status(200).json({
            ok: true,
            msg: 'Asignación de permiso a perfil deshabilitada exitosamente.',
            perfilPermiso: perfilPermisoDB
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al deshabilitar la asignación de permiso.'
        });
    }
};
exports.eliminarPerfilPermiso = eliminarPerfilPermiso;
//# sourceMappingURL=perfilesPermisos.controller.js.map