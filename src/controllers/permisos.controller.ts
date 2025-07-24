import { Request, Response } from 'express';
import { PermisosModel, IPermiso } from '../models/permisos.model';
import { ItemsMenuModel } from '../models/itemsMenu.model'; // Para validar idItemMenu

const crearPermiso = async (req: Request, res: Response) => {
    const { descripcion, idItemMenu } = req.body;
    try {
        const existePermiso = await PermisosModel.findOne({ descripcion });
        if (existePermiso) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un permiso con esa descripción.'
            });
        }
        const existeItemMenu = await ItemsMenuModel.findById(idItemMenu);
        if (!existeItemMenu) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de ítem de menú proporcionado no existe.'
            });
        }

        const permiso = new PermisosModel(req.body);
        await permiso.save();
        res.status(201).json({
            ok: true,
            msg: 'Permiso creado exitosamente',
            permiso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el permiso.'
        });
    }
};

const getPermisos = async (req: Request, res: Response) => {
    try {
        const permisos = await PermisosModel.find().populate('idItemMenu', 'descripcion');
        res.status(200).json({
            ok: true,
            permisos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los permisos.'
        });
    }
};

const getPermisoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const permiso = await PermisosModel.findById(id).populate('idItemMenu', 'descripcion');
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el permiso.'
        });
    }
};

const actualizarPermiso = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, idItemMenu, ...campos } = req.body;
    try {
        const permisoDB = await PermisosModel.findById(id);
        if (!permisoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Permiso no encontrado por ID.'
            });
        }

        if (descripcion && descripcion !== permisoDB.descripcion) {
            const existeDescripcion = await PermisosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un permiso con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }

        if (idItemMenu && idItemMenu !== String(permisoDB.idItemMenu)) {
            const existeItemMenu = await ItemsMenuModel.findById(idItemMenu);
            if (!existeItemMenu) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de ítem de menú proporcionado no existe.'
                });
            }
            campos.idItemMenu = idItemMenu;
        }

        const permisoActualizado = await PermisosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Permiso actualizado exitosamente',
            permiso: permisoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el permiso.'
        });
    }
};

const eliminarPermiso = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const permisoBorrado = await PermisosModel.findByIdAndDelete(id); // Eliminación física
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el permiso.'
        });
    }
};

export {
    crearPermiso,
    getPermisos,
    getPermisoById,
    actualizarPermiso,
    eliminarPermiso
};