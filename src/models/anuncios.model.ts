import mongoose, { Document, Schema } from 'mongoose';
import { EdificiosModel } from './edificios.model'; // Ya existente

export interface IAnuncio extends Document {
    identificacion: string;
    titulo: string;
    descripcion?: string;
    fecha: Date;
    idEdificio: mongoose.Types.ObjectId;
}

const anuncioSchema = new mongoose.Schema<IAnuncio>({
    identificacion: {
        type: String,
        required: [true, 'La identificación del anuncio es obligatoria'],
        unique: true, // Cada anuncio debe tener una identificación única globalmente (o por edificio)
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título del anuncio es obligatorio']
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha del anuncio es obligatoria'],
        default: Date.now
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio al que pertenece el anuncio es obligatorio']
    }
});

// Considerar un índice compuesto si la identificación debe ser única SOLO por edificio
// anuncioSchema.index({ identificacion: 1, idEdificio: 1 }, { unique: true });
// Por ahora, lo dejamos único globalmente como se especificó para 'Identificacion'

anuncioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const AnunciosModel = mongoose.model<IAnuncio>('Anuncios', anuncioSchema, 'anuncios');