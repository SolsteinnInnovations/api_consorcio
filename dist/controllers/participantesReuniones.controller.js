"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarParticipanteReunion = exports.getParticipanteReunionById = exports.getParticipantesReuniones = exports.crearParticipanteReunion = void 0;
const participantesReuniones_model_1 = require("../models/participantesReuniones.model");
const actasReuniones_model_1 = require("../models/actasReuniones.model");
const personas_model_1 = require("../models/personas.model");
const crearParticipanteReunion = async (req, res) => {
    const { idReunion, idPersona } = req.body;
    try {
        const existeReunion = await actasReuniones_model_1.ActasReunionesModel.findById(idReunion);
        if (!existeReunion) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de reunión proporcionado no existe.'
            });
        }
        const existePersona = await personas_model_1.PersonasModel.findById(idPersona);
        if (!existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de persona proporcionado no existe.'
            });
        }
        const existeParticipacion = await participantesReuniones_model_1.ParticipantesReunionesModel.findOne({ idReunion, idPersona });
        if (existeParticipacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta persona ya está registrada como participante en esta reunión.'
            });
        }
        const participanteReunion = new participantesReuniones_model_1.ParticipantesReunionesModel(req.body);
        await participanteReunion.save();
        res.status(201).json({
            ok: true,
            msg: 'Participante de reunión creado exitosamente',
            participanteReunion
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el participante de reunión.'
        });
    }
};
exports.crearParticipanteReunion = crearParticipanteReunion;
const getParticipantesReuniones = async (req, res) => {
    try {
        const participantesReuniones = await participantesReuniones_model_1.ParticipantesReunionesModel.find()
            .populate('idReunion', 'titulo fecha') // Muestra título y fecha de la reunión
            .populate('idPersona', 'nombres apellidos documento'); // Muestra nombres, apellidos y documento del participante
        res.status(200).json({
            ok: true,
            participantesReuniones
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los participantes de reunión.'
        });
    }
};
exports.getParticipantesReuniones = getParticipantesReuniones;
const getParticipanteReunionById = async (req, res) => {
    const id = req.params.id;
    try {
        const participanteReunion = await participantesReuniones_model_1.ParticipantesReunionesModel.findById(id)
            .populate('idReunion', 'titulo fecha')
            .populate('idPersona', 'nombres apellidos documento');
        if (!participanteReunion) {
            return res.status(404).json({
                ok: false,
                msg: 'Participante de reunión no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            participanteReunion
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el participante de reunión.'
        });
    }
};
exports.getParticipanteReunionById = getParticipanteReunionById;
const eliminarParticipanteReunion = async (req, res) => {
    const id = req.params.id;
    try {
        const participanteReunionBorrado = await participantesReuniones_model_1.ParticipantesReunionesModel.findByIdAndDelete(id);
        if (!participanteReunionBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Participante de reunión no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Participante de reunión eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el participante de reunión.'
        });
    }
};
exports.eliminarParticipanteReunion = eliminarParticipanteReunion;
