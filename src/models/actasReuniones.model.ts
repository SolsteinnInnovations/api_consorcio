import mongoose, { Document, Schema } from 'mongoose';
import { EdificiosModel } from './edificios.model'; // Ya existente

export interface IActaReunion extends Document {
    titulo: string;
    descripcion?: string;
    fecha: Date;
    resolucion?: string; // Texto de las resoluciones
    idEdificio: mongoose.Types.ObjectId;
}

const actaReunionSchema = new mongoose.Schema<IActaReunion>({
    titulo: {
        type: String,
        required: [true, 'El título de la reunión es obligatorio']
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha de la reunión es obligatoria'],
        default: Date.now
    },
    resolucion: {
        type: String
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio al que pertenece la reunión es obligatorio']
    }
});

actaReunionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ActasReunionesModel = mongoose.model<IActaReunion>('ActasReuniones', actaReunionSchema, 'actasReuniones');