import mongoose, { Document, Schema } from 'mongoose';
import { EdificiosModel } from './edificios.model'; // Ya existente

export interface IEspacioComun extends Document {
    identificacion: string;
    titulo: string;
    habilitado: boolean;
    idEdificio: mongoose.Types.ObjectId;
    // Opcional: Podrías considerar un campo para el plano,
    // por ejemplo, una URL a un archivo, o un ID a la tabla Archivos
    // planoUrl?: string; // O referencia a Archivos si el plano es un archivo subido
}

const espacioComunSchema = new mongoose.Schema<IEspacioComun>({
    identificacion: {
        type: String,
        required: [true, 'La identificación del espacio común es obligatoria'],
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título del espacio común es obligatorio']
    },
    habilitado: {
        type: Boolean,
        default: true
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio es obligatorio']
    }
});

// Índice compuesto único para asegurar que la identificación de un espacio común sea única dentro de un edificio
espacioComunSchema.index({ identificacion: 1, idEdificio: 1 }, { unique: true });

espacioComunSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const EspaciosComunesModel = mongoose.model<IEspacioComun>('EspaciosComunes', espacioComunSchema, 'espaciosComunes');