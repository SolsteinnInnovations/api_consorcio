"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPermiso = exports.actualizarPermiso = exports.getPermisoById = exports.getPermisos = exports.crearPermiso = void 0;
const permisos_model_1 = require("../models/permisos.model");
const itemsMenu_model_1 = require("../models/itemsMenu.model"); // Para validar idItemMenu
const crearPermiso = async (req, res) => {
    const { descripcion, idItemMenu } = req.body;
    try {
        const existePermiso = await permisos_model_1.PermisosModel.findOne({ descripcion });
        if (existePermiso) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un permiso con esa descripción.'
            });
        }
        const existeItemMenu = await itemsMenu_model_1.ItemsMenuModel.findById(idItemMenu);
        if (!existeItemMenu) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de ítem de menú proporcionado no existe.'
            });
        }
        const permiso = new permisos_model_1.PermisosModel(req.body);
        await permiso.save();
        res.status(201).json({
            ok: true,
            msg: 'Permiso creado exitosamente',
            permiso
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el permiso.'
        });
    }
};
exports.crearPermiso = crearPermiso;
const getPermisos = async (req, res) => {
    try {
        const permisos = await permisos_model_1.PermisosModel.find().populate('idItemMenu', 'descripcion');
        res.status(200).json({
            ok: true,
            permisos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los permisos.'
        });
    }
};
exports.getPermisos = getPermisos;
const getPermisoById = async (req, res) => {
    const id = req.params.id;
    try {
        const permiso = await permisos_model_1.PermisosModel.findById(id).populate('idItemMenu', 'descripcion');
        if (!permiso) {
            return res.status(404).json({
                ok: false,
                msg: 'Permiso no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            permiso
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el permiso.'
        });
    }
};
exports.getPermisoById = getPermisoById;
const actualizarPermiso = async (req, res) => {
    const id = req.params.id;
    const { descripcion, idItemMenu, ...campos } = req.body;
    try {
        const permisoDB = await permisos_model_1.PermisosModel.findById(id);
        if (!permisoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Permiso no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== permisoDB.descripcion) {
            const existeDescripcion = await permisos_model_1.PermisosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un permiso con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        if (idItemMenu && idItemMenu !== String(permisoDB.idItemMenu)) {
            const existeItemMenu = await itemsMenu_model_1.ItemsMenuModel.findById(idItemMenu);
            if (!existeItemMenu) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de ítem de menú proporcionado no existe.'
                });
            }
            campos.idItemMenu = idItemMenu;
        }
        const permisoActualizado = await permisos_model_1.PermisosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Permiso actualizado exitosamente',
            permiso: permisoActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el permiso.'
        });
    }
};
exports.actualizarPermiso = actualizarPermiso;
const eliminarPermiso = async (req, res) => {
    const id = req.params.id;
    try {
        const permisoBorrado = await permisos_model_1.PermisosModel.findByIdAndDelete(id); // Eliminación física
        if (!permisoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Permiso no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Permiso eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el permiso.'
        });
    }
};
exports.eliminarPermiso = eliminarPermiso;
