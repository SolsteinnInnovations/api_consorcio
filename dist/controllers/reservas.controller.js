"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarReserva = exports.actualizarReserva = exports.getReservaById = exports.getReservas = exports.crearReserva = void 0;
const reservas_model_1 = require("../models/reservas.model");
const personas_model_1 = require("../models/personas.model");
const espaciosComunes_model_1 = require("../models/espaciosComunes.model");
const departamentos_model_1 = require("../models/departamentos.model"); // Para validar que la persona viva en el edificio
const crearReserva = async (req, res) => {
    const { identificacion, fechaInicio, fechaFin, idPersona, idEspacio } = req.body;
    try {
        const existeReserva = await reservas_model_1.ReservasModel.findOne({ identificacion });
        if (existeReserva) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una reserva con esa identificación.'
            });
        }
        const personaDB = await personas_model_1.PersonasModel.findById(idPersona);
        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de persona proporcionado no existe.'
            });
        }
        const espacioDB = await espaciosComunes_model_1.EspaciosComunesModel.findById(idEspacio);
        if (!espacioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de espacio común proporcionado no existe.'
            });
        }
        // Validación adicional: la persona debe tener un departamento en el edificio del espacio común
        const departamentoDePersona = await departamentos_model_1.DepartamentosModel.findOne({ idPersona: personaDB._id });
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
        const reserva = new reservas_model_1.ReservasModel(req.body);
        await reserva.save();
        res.status(201).json({
            ok: true,
            msg: 'Reserva creada exitosamente',
            reserva
        });
    }
    catch (error) {
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
exports.crearReserva = crearReserva;
const getReservas = async (req, res) => {
    try {
        const reservas = await reservas_model_1.ReservasModel.find()
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las reservas.'
        });
    }
};
exports.getReservas = getReservas;
const getReservaById = async (req, res) => {
    const id = req.params.id;
    try {
        const reserva = await reservas_model_1.ReservasModel.findById(id)
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la reserva.'
        });
    }
};
exports.getReservaById = getReservaById;
const actualizarReserva = async (req, res) => {
    const id = req.params.id;
    const { identificacion, fechaInicio, fechaFin, idPersona, idEspacio, ...campos } = req.body;
    try {
        const reservaDB = await reservas_model_1.ReservasModel.findById(id);
        if (!reservaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Reserva no encontrada por ID.'
            });
        }
        if (identificacion && identificacion !== reservaDB.identificacion) {
            const existeIdentificacion = await reservas_model_1.ReservasModel.findOne({ identificacion });
            if (existeIdentificacion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una reserva con esa identificación.'
                });
            }
            campos.identificacion = identificacion;
        }
        if (idPersona && String(idPersona) !== String(reservaDB.idPersona)) {
            const personaDB = await personas_model_1.PersonasModel.findById(idPersona);
            if (!personaDB) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de persona proporcionado no existe.'
                });
            }
            campos.idPersona = idPersona;
        }
        if (idEspacio && String(idEspacio) !== String(reservaDB.idEspacio)) {
            const espacioDB = await espaciosComunes_model_1.EspaciosComunesModel.findById(idEspacio);
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
        const conflictingReservation = await reservas_model_1.ReservasModel.findOne({
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
        if (fechaInicio)
            campos.fechaInicio = fechaInicio;
        if (fechaFin)
            campos.fechaFin = fechaFin;
        const reservaActualizada = await reservas_model_1.ReservasModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Reserva actualizada exitosamente',
            reserva: reservaActualizada
        });
    }
    catch (error) {
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
exports.actualizarReserva = actualizarReserva;
const eliminarReserva = async (req, res) => {
    const id = req.params.id;
    try {
        const reservaBorrada = await reservas_model_1.ReservasModel.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la reserva.'
        });
    }
};
exports.eliminarReserva = eliminarReserva;
//# sourceMappingURL=reservas.controller.js.map