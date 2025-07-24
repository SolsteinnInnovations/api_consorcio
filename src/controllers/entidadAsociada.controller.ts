import { Request, Response } from 'express';
import { EntidadAsociadaModel, IEntidadAsociada } from '../models/entidadAsociada.model';

const crearEntidadAsociada = async (req: Request, res: Response) => {
    const { descripcion } = req.body;
    try {
        const existeEntidadAsociada = await EntidadAsociadaModel.findOne({ descripcion });
        if (existeEntidadAsociada) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una entidad asociada con esa descripción.'
            });
        }
        const entidadAsociada = new EntidadAsociadaModel(req.body);
        await entidadAsociada.save();
        res.status(201).json({
            ok: true,
            msg: 'Entidad asociada creada exitosamente',
            entidadAsociada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la entidad asociada.'
        });
    }
};

const getEntidadesAsociadas = async (req: Request, res: Response) => {
    try {
        const entidadesAsociadas = await EntidadAsociadaModel.find();
        res.status(200).json({
            ok: true,
            entidadesAsociadas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las entidades asociadas.'
        });
    }
};

const getEntidadAsociadaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const entidadAsociada = await EntidadAsociadaModel.findById(id);
        if (!entidadAsociada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entidad asociada no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            entidadAsociada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la entidad asociada.'
        });
    }
};

const actualizarEntidadAsociada = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const entidadAsociadaDB = await EntidadAsociadaModel.findById(id);
        if (!entidadAsociadaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Entidad asociada no encontrada por ID.'
            });
        }
        if (descripcion && descripcion !== entidadAsociadaDB.descripcion) {
            const existeDescripcion = await EntidadAsociadaModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una entidad asociada con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const entidadAsociadaActualizada = await EntidadAsociadaModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Entidad asociada actualizada exitosamente',
            entidadAsociada: entidadAsociadaActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la entidad asociada.'
        });
    }
};

const eliminarEntidadAsociada = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const entidadAsociadaBorrada = await EntidadAsociadaModel.findByIdAndDelete(id);
        if (!entidadAsociadaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entidad asociada no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Entidad asociada eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la entidad asociada.'
        });
    }
};

export {
    crearEntidadAsociada,
    getEntidadesAsociadas,
    getEntidadAsociadaById,
    actualizarEntidadAsociada,
    eliminarEntidadAsociada
};