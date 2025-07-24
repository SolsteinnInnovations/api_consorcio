import { Request, Response } from 'express';
import { ParticipantesReunionesModel, IParticipanteReunion } from '../models/participantesReuniones.model';
import { ActasReunionesModel } from '../models/actasReuniones.model';
import { PersonasModel } from '../models/personas.model';

const crearParticipanteReunion = async (req: Request, res: Response) => {
    const { idReunion, idPersona } = req.body;
    try {
        const existeReunion = await ActasReunionesModel.findById(idReunion);
        if (!existeReunion) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de reunión proporcionado no existe.'
            });
        }

        const existePersona = await PersonasModel.findById(idPersona);
        if (!existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de persona proporcionado no existe.'
            });
        }

        const existeParticipacion = await ParticipantesReunionesModel.findOne({ idReunion, idPersona });
        if (existeParticipacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta persona ya está registrada como participante en esta reunión.'
            });
        }

        const participanteReunion = new ParticipantesReunionesModel(req.body);
        await participanteReunion.save();
        res.status(201).json({
            ok: true,
            msg: 'Participante de reunión creado exitosamente',
            participanteReunion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el participante de reunión.'
        });
    }
};

const getParticipantesReuniones = async (req: Request, res: Response) => {
    try {
        const participantesReuniones = await ParticipantesReunionesModel.find()
            .populate('idReunion', 'titulo fecha') // Muestra título y fecha de la reunión
            .populate('idPersona', 'nombres apellidos documento'); // Muestra nombres, apellidos y documento del participante
        res.status(200).json({
            ok: true,
            participantesReuniones
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los participantes de reunión.'
        });
    }
};

const getParticipanteReunionById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const participanteReunion = await ParticipantesReunionesModel.findById(id)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el participante de reunión.'
        });
    }
};

const eliminarParticipanteReunion = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const participanteReunionBorrado = await ParticipantesReunionesModel.findByIdAndDelete(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el participante de reunión.'
        });
    }
};

export {
    crearParticipanteReunion,
    getParticipantesReuniones,
    getParticipanteReunionById,
    eliminarParticipanteReunion
};