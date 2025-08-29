"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarItemMenu = exports.actualizarItemMenu = exports.getItemMenuById = exports.getItemsMenu = exports.crearItemMenu = void 0;
const itemsMenu_model_1 = require("../models/itemsMenu.model");
const crearItemMenu = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const existeItemMenu = await itemsMenu_model_1.ItemsMenuModel.findOne({ descripcion });
        if (existeItemMenu) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un ítem de menú con esa descripción.'
            });
        }
        const itemMenu = new itemsMenu_model_1.ItemsMenuModel(req.body);
        await itemMenu.save();
        res.status(201).json({
            ok: true,
            msg: 'Ítem de menú creado exitosamente',
            itemMenu
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el ítem de menú.'
        });
    }
};
exports.crearItemMenu = crearItemMenu;
const getItemsMenu = async (req, res) => {
    try {
        const itemsMenu = await itemsMenu_model_1.ItemsMenuModel.find();
        res.status(200).json({
            ok: true,
            itemsMenu
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los ítems de menú.'
        });
    }
};
exports.getItemsMenu = getItemsMenu;
const getItemMenuById = async (req, res) => {
    const id = req.params.id;
    try {
        const itemMenu = await itemsMenu_model_1.ItemsMenuModel.findById(id);
        if (!itemMenu) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem de menú no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            itemMenu
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el ítem de menú.'
        });
    }
};
exports.getItemMenuById = getItemMenuById;
const actualizarItemMenu = async (req, res) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const itemMenuDB = await itemsMenu_model_1.ItemsMenuModel.findById(id);
        if (!itemMenuDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem de menú no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== itemMenuDB.descripcion) {
            const existeDescripcion = await itemsMenu_model_1.ItemsMenuModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un ítem de menú con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const itemMenuActualizado = await itemsMenu_model_1.ItemsMenuModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Ítem de menú actualizado exitosamente',
            itemMenu: itemMenuActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el ítem de menú.'
        });
    }
};
exports.actualizarItemMenu = actualizarItemMenu;
const eliminarItemMenu = async (req, res) => {
    const id = req.params.id;
    try {
        const itemMenuDB = await itemsMenu_model_1.ItemsMenuModel.findById(id);
        if (!itemMenuDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem de menú no encontrado por ID.'
            });
        }
        itemMenuDB.habilitado = false; // Borrado lógico
        await itemMenuDB.save();
        res.status(200).json({
            ok: true,
            msg: 'Ítem de menú deshabilitado exitosamente.',
            itemMenu: itemMenuDB
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al deshabilitar el ítem de menú.'
        });
    }
};
exports.eliminarItemMenu = eliminarItemMenu;
//# sourceMappingURL=itemsMenu.controller.js.map