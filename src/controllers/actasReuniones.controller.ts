import { Request, Response } from 'express';
import { ActasReunionesModel, IActaReunion } from '../models/actasReuniones.model';
import { EdificiosModel } from '../models/edificios.model';

const crearActaReunion = async (req: Request, res: Response) => {
    const { idEdificio } = req.body;
    try {
        const existeEdificio = await EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }

        const actaReunion = new ActasReunionesModel(req.body);
        await actaReunion.save();
        res.status(201).json({
            ok: true,
            msg: 'Acta de reunión creada exitosamente',
            actaReunion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el acta de reunión.'
        });
    }
};

const getActasReuniones = async (req: Request, res: Response) => {
    try {
        const actasReuniones = await ActasReunionesModel.find()
            .populate('idEdificio', 'direccion identificadorEdificio');
        res.status(200).json({
            ok: true,
            actasReuniones
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las actas de reuniones.'
        });
    }
};

const getActaReunionById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const actaReunion = await ActasReunionesModel.findById(id)
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!actaReunion) {
            return res.status(404).json({
                ok: false,
                msg: 'Acta de reunión no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            actaReunion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el acta de reunión.'
        });
    }
};

const actualizarActaReunion = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { idEdificio, ...campos } = req.body;
    try {
        const actaReunionDB = await ActasReunionesModel.findById(id);
        if (!actaReunionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Acta de reunión no encontrada por ID.'
            });
        }

        if (idEdificio && String(idEdificio) !== String(actaReunionDB.idEdificio)) {
            const existeEdificio = await EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
            campos.idEdificio = idEdificio;
        }

        const actaReunionActualizada = await ActasReunionesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Acta de reunión actualizada exitosamente',
            actaReunion: actaReunionActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el acta de reunión.'
        });
    }
};

const eliminarActaReunion = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const actaReunionBorrada = await ActasReunionesModel.findByIdAndDelete(id);
        if (!actaReunionBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Acta de reunión no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Acta de reunión eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el acta de reunión.'
        });
    }
};

export {
    crearActaReunion,
    getActasReuniones,
    getActaReunionById,
    actualizarActaReunion,
    eliminarActaReunion
};