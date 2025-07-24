import mongoose, { Document, Schema } from 'mongoose';
import { ActasReunionesModel } from './actasReuniones.model'; // Recién creada
import { PersonasModel } from './personas.model';             // Ya existente

export interface IParticipanteReunion extends Document {
    idReunion: mongoose.Types.ObjectId;
    idPersona: mongoose.Types.ObjectId;
}

const participantesReunionesSchema = new mongoose.Schema<IParticipanteReunion>({
    idReunion: {
        type: Schema.Types.ObjectId,
        ref: 'ActasReuniones',
        required: [true, 'La referencia a la reunión es obligatoria']
    },
    idPersona: {
        type: Schema.Types.ObjectId,
        ref: 'Personas',
        required: [true, 'La referencia a la persona es obligatoria']
    }
});

// Índice compuesto único para evitar que una persona participe dos veces en la misma reunión
participantesReunionesSchema.index({ idReunion: 1, idPersona: 1 }, { unique: true });

participantesReunionesSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ParticipantesReunionesModel = mongoose.model<IParticipanteReunion>('ParticipantesReuniones', participantesReunionesSchema, 'participantesReuniones');