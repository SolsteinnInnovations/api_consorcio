import mongoose, { Document, Schema } from 'mongoose';
import { PaisesModel } from './paises.model'; // Importa el modelo de Paises

export interface IProvincia extends Document {
    descripcion: string;
    idPais: mongoose.Types.ObjectId; // Referencia a Paises
}

const provinciaSchema = new mongoose.Schema<IProvincia>({
    descripcion: {
        type: String,
        required: [true, 'La descripción de la provincia es obligatoria'],
        unique: true // Asumo que el nombre de la provincia es único
    },
    idPais: {
        type: Schema.Types.ObjectId,
        ref: 'Paises', // Debe coincidir con el nombre del modelo de Paises
        required: [true, 'El país es obligatorio']
    }
});

provinciaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ProvinciasModel = mongoose.model<IProvincia>('Provincias', provinciaSchema, 'provincias');