import mongoose, { Document, Schema } from 'mongoose';
import { ProvinciasModel } from './provincias.model'; // Importa el modelo de Provincias

export interface ILocalidad extends Document {
    descripcion: string;
    codigoPostal: string;
    idProvincia: mongoose.Types.ObjectId; // Referencia a Provincias
}

const localidadSchema = new mongoose.Schema<ILocalidad>({
    descripcion: {
        type: String,
        required: [true, 'La descripción de la localidad es obligatoria'],
        unique: true // Asumo que el nombre de la localidad es único
    },
    codigoPostal: {
        type: String,
        required: [true, 'El código postal es obligatorio']
    },
    idProvincia: {
        type: Schema.Types.ObjectId,
        ref: 'Provincias', // Debe coincidir con el nombre del modelo de Provincias
        required: [true, 'La provincia es obligatoria']
    }
});

localidadSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const LocalidadesModel = mongoose.model<ILocalidad>('Localidades', localidadSchema, 'localidades');