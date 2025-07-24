import { Request, Response } from 'express';
import { ItemsMenuModel, IItemMenu } from '../models/itemsMenu.model';

const crearItemMenu = async (req: Request, res: Response) => {
    const { descripcion } = req.body;
    try {
        const existeItemMenu = await ItemsMenuModel.findOne({ descripcion });
        if (existeItemMenu) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un ítem de menú con esa descripción.'
            });
        }
        const itemMenu = new ItemsMenuModel(req.body);
        await itemMenu.save();
        res.status(201).json({
            ok: true,
            msg: 'Ítem de menú creado exitosamente',
            itemMenu
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el ítem de menú.'
        });
    }
};

const getItemsMenu = async (req: Request, res: Response) => {
    try {
        const itemsMenu = await ItemsMenuModel.find();
        res.status(200).json({
            ok: true,
            itemsMenu
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los ítems de menú.'
        });
    }
};

const getItemMenuById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const itemMenu = await ItemsMenuModel.findById(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el ítem de menú.'
        });
    }
};

const actualizarItemMenu = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const itemMenuDB = await ItemsMenuModel.findById(id);
        if (!itemMenuDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Ítem de menú no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== itemMenuDB.descripcion) {
            const existeDescripcion = await ItemsMenuModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un ítem de menú con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const itemMenuActualizado = await ItemsMenuModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Ítem de menú actualizado exitosamente',
            itemMenu: itemMenuActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el ítem de menú.'
        });
    }
};

const eliminarItemMenu = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const itemMenuDB = await ItemsMenuModel.findById(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al deshabilitar el ítem de menú.'
        });
    }
};

export {
    crearItemMenu,
    getItemsMenu,
    getItemMenuById,
    actualizarItemMenu,
    eliminarItemMenu
};