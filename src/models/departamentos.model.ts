import mongoose, { Document, Schema } from 'mongoose';
import { PersonasModel } from './personas.model';   // Ya creada
import { EdificiosModel } from './edificios.model'; // Recién creada

export interface IDepartamento extends Document {
    identificacion: string; // Ej: "A", "PH1", "Local 3"
    piso?: number; // Puede ser nulo para locales, PH, etc.
    descripcion?: string; // Descripción adicional del departamento
    ocupado: boolean; // Indica si el departamento está ocupado
    idPersona?: mongoose.Types.ObjectId; // Referencia a la persona que lo ocupa (puede ser null)
    idEdificio: mongoose.Types.ObjectId; // Edificio al que pertenece
}

const departamentoSchema = new mongoose.Schema<IDepartamento>({
    identificacion: {
        type: String,
        required: [true, 'La identificación del departamento es obligatoria']
    },
    piso: {
        type: Number,
        min: 0, // Puede ser 0 para planta baja
        required: false
    },
    descripcion: {
        type: String
    },
    ocupado: {
        type: Boolean,
        default: false
    },
    idPersona: {
        type: Schema.Types.ObjectId,
        ref: 'Personas',
        required: false, // Puede ser nulo si no está ocupado
        unique: true, // Una persona solo puede ocupar un departamento a la vez
        sparse: true // Permite múltiples documentos con valor null para idPersona
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio al que pertenece el departamento es obligatorio']
    }
});

// Índice compuesto único para asegurar que la identificación de departamento sea única DENTRO de un edificio
departamentoSchema.index({ identificacion: 1, idEdificio: 1 }, { unique: true });

departamentoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const DepartamentosModel = mongoose.model<IDepartamento>('Departamentos', departamentoSchema, 'departamentos');