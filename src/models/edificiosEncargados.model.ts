import mongoose, { Document, Schema } from 'mongoose';
import { PersonasModel } from './personas.model';   // Ya creada
import { EdificiosModel } from './edificios.model'; // Recién creada

export interface IEdificioEncargado extends Document {
    idPersona: mongoose.Types.ObjectId;
    idEdificio: mongoose.Types.ObjectId;
}

const edificiosEncargadosSchema = new mongoose.Schema<IEdificioEncargado>({
    idPersona: {
        type: Schema.Types.ObjectId,
        ref: 'Personas',
        required: [true, 'La persona encargada es obligatoria']
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio es obligatorio']
    }
});

// Clave compuesta única: una persona no puede ser encargada del mismo edificio dos veces
edificiosEncargadosSchema.index({ idPersona: 1, idEdificio: 1 }, { unique: true });

edificiosEncargadosSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const EdificiosEncargadosModel = mongoose.model<IEdificioEncargado>('EdificiosEncargados', edificiosEncargadosSchema, 'edificiosEncargados');