import { Request, Response } from 'express';
import { ReservasModel, IReserva } from '../models/reservas.model';
import { PersonasModel } from '../models/personas.model';
import { EspaciosComunesModel } from '../models/espaciosComunes.model';
import { DepartamentosModel } from '../models/departamentos.model'; // Para validar que la persona viva en el edificio

const crearReserva = async (req: Request, res: Response) => {
    const { identificacion, fechaInicio, fechaFin, idPersona, idEspacio } = req.body;
    try {
        const existeReserva = await ReservasModel.findOne({ identificacion });
        if (existeReserva) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una reserva con esa identificación.'
            });
        }

        const personaDB = await PersonasModel.findById(idPersona);
        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de persona proporcionado no existe.'
            });
        }

        const espacioDB = await EspaciosComunesModel.findById(idEspacio);
        if (!espacioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de espacio común proporcionado no existe.'
            });
        }

        // Validación adicional: la persona debe tener un departamento en el edificio del espacio común
        const departamentoDePersona = await DepartamentosModel.findOne({ idPersona: personaDB._id });
        if (!departamentoDePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona que realiza la reserva debe tener un departamento asignado.'
            });
        }
        if (String(departamentoDePersona.idEdificio) !== String(espacioDB.idEdificio)) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona que realiza la reserva no pertenece al edificio del espacio común seleccionado.'
            });
        }

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de inicio debe ser anterior a la fecha de fin.'
            });
        }

        const reserva = new ReservasModel(req.body);
        await reserva.save();
        res.status(201).json({
            ok: true,
            msg: 'Reserva creada exitosamente',
            reserva
        });
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la reserva.'
        });
    }
};

const getReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await ReservasModel.find()
            .populate('idPersona', 'nombres apellidos documento')
            .populate({
                path: 'idEspacio',
                select: 'identificacion titulo idEdificio',
                populate: {
                    path: 'idEdificio',
                    select: 'identificadorEdificio direccion'
                }
            });
        res.status(200).json({
            ok: true,
            reservas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las reservas.'
        });
    }
};

const getReservaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reserva = await ReservasModel.findById(id)
            .populate('idPersona', 'nombres apellidos documento')
            .populate({
                path: 'idEspacio',
                select: 'identificacion titulo idEdificio',
                populate: {
                    path: 'idEdificio',
                    select: 'identificadorEdificio direccion'
                }
            });
        if (!reserva) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            reserva
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la reserva.'
        });
    }
};

const actualizarReserva = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { identificacion, fechaInicio, fechaFin, idPersona, idEspacio, ...campos } = req.body;
    try {
        const reservaDB = await ReservasModel.findById(id);
        if (!reservaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no encontrada por ID.'
            });
        }

        if (identificacion && identificacion !== reservaDB.identificacion) {
            const existeIdentificacion = await ReservasModel.findOne({ identificacion });
            if (existeIdentificacion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una reserva con esa identificación.'
                });
            }
            campos.identificacion = identificacion;
        }

        if (idPersona && String(idPersona) !== String(reservaDB.idPersona)) {
            const personaDB = await PersonasModel.findById(idPersona);
            if (!personaDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de persona proporcionado no existe.'
                });
            }
            campos.idPersona = idPersona;
        }

        if (idEspacio && String(idEspacio) !== String(reservaDB.idEspacio)) {
            const espacioDB = await EspaciosComunesModel.findById(idEspacio);
            if (!espacioDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de espacio común proporcionado no existe.'
                });
            }
            campos.idEspacio = idEspacio;
        }

        const newFechaInicio = fechaInicio || reservaDB.fechaInicio;
        const newFechaFin = fechaFin || reservaDB.fechaFin;

        if (new Date(newFechaInicio) >= new Date(newFechaFin)) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de inicio debe ser anterior a la fecha de fin.'
            });
        }

        // Re-validar superposición de fechas con la nueva información
        const targetEspacioId = idEspacio || reservaDB.idEspacio;
        const conflictingReservation = await ReservasModel.findOne({
            idEspacio: targetEspacioId,
            _id: { $ne: id }, // Excluir la propia reserva
            $or: [
                {
                    fechaInicio: { $lt: newFechaFin },
                    fechaFin: { $gt: newFechaInicio }
                }
            ]
        });

        if (conflictingReservation) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una reserva que se superpone con las fechas y el espacio seleccionado.'
            });
        }

        if (fechaInicio) campos.fechaInicio = fechaInicio;
        if (fechaFin) campos.fechaFin = fechaFin;

        const reservaActualizada = await ReservasModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Reserva actualizada exitosamente',
            reserva: reservaActualizada
        });
    } catch (error: any) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la reserva.'
        });
    }
};

const eliminarReserva = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reservaBorrada = await ReservasModel.findByIdAndDelete(id);
        if (!reservaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Reserva eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la reserva.'
        });
    }
};

export {
    crearReserva,
    getReservas,
    getReservaById,
    actualizarReserva,
    eliminarReserva
};