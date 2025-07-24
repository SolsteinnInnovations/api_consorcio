import mongoose, { Document, Schema } from 'mongoose';
import { LocalidadesModel } from './localidades.model'; // Ya existente

export interface IEdificio extends Document {
    direccion: string;
    idLocalidad: mongoose.Types.ObjectId;
    identificadorEdificio: string; // Alfanumérico, customizable
}

const edificioSchema = new mongoose.Schema<IEdificio>({
    direccion: {
        type: String,
        required: [true, 'La dirección del edificio es obligatoria']
    },
    idLocalidad: {
        type: Schema.Types.ObjectId,
        ref: 'Localidades',
        required: [true, 'La localidad del edificio es obligatoria']
    },
    identificadorEdificio: {
        type: String,
        required: [true, 'El identificador del edificio es obligatorio'],
        unique: true, // Cada edificio debe tener un identificador único
        uppercase: true, // Opcional: forzar mayúsculas para el identificador
        trim: true
    }
});

edificioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const EdificiosModel = mongoose.model<IEdificio>('Edificios', edificioSchema, 'edificios');