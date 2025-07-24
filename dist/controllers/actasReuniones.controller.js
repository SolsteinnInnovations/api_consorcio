"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarActaReunion = exports.actualizarActaReunion = exports.getActaReunionById = exports.getActasReuniones = exports.crearActaReunion = void 0;
const actasReuniones_model_1 = require("../models/actasReuniones.model");
const edificios_model_1 = require("../models/edificios.model");
const crearActaReunion = async (req, res) => {
    const { idEdificio } = req.body;
    try {
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        const actaReunion = new actasReuniones_model_1.ActasReunionesModel(req.body);
        await actaReunion.save();
        res.status(201).json({
            ok: true,
            msg: 'Acta de reunión creada exitosamente',
            actaReunion
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el acta de reunión.'
        });
    }
};
exports.crearActaReunion = crearActaReunion;
const getActasReuniones = async (req, res) => {
    try {
        const actasReuniones = await actasReuniones_model_1.ActasReunionesModel.find()
            .populate('idEdificio', 'direccion identificadorEdificio');
        res.status(200).json({
            ok: true,
            actasReuniones
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las actas de reuniones.'
        });
    }
};
exports.getActasReuniones = getActasReuniones;
const getActaReunionById = async (req, res) => {
    const id = req.params.id;
    try {
        const actaReunion = await actasReuniones_model_1.ActasReunionesModel.findById(id)
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el acta de reunión.'
        });
    }
};
exports.getActaReunionById = getActaReunionById;
const actualizarActaReunion = async (req, res) => {
    const id = req.params.id;
    const { idEdificio, ...campos } = req.body;
    try {
        const actaReunionDB = await actasReuniones_model_1.ActasReunionesModel.findById(id);
        if (!actaReunionDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Acta de reunión no encontrada por ID.'
            });
        }
        if (idEdificio && String(idEdificio) !== String(actaReunionDB.idEdificio)) {
            const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
            campos.idEdificio = idEdificio;
        }
        const actaReunionActualizada = await actasReuniones_model_1.ActasReunionesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Acta de reunión actualizada exitosamente',
            actaReunion: actaReunionActualizada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el acta de reunión.'
        });
    }
};
exports.actualizarActaReunion = actualizarActaReunion;
const eliminarActaReunion = async (req, res) => {
    const id = req.params.id;
    try {
        const actaReunionBorrada = await actasReuniones_model_1.ActasReunionesModel.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el acta de reunión.'
        });
    }
};
exports.eliminarActaReunion = eliminarActaReunion;
