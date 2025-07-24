import mongoose, { Document, Schema } from 'mongoose';
import { ReclamosModel } from './reclamos.model';       // Recién creada
import { DepartamentosModel } from './departamentos.model'; // Ya existente

export interface IReclamoDepartamento extends Document {
    idReclamo: mongoose.Types.ObjectId;
    idDepartamento: mongoose.Types.ObjectId;
}

const reclamosDepartamentosSchema = new mongoose.Schema<IReclamoDepartamento>({
    idReclamo: {
        type: Schema.Types.ObjectId,
        ref: 'Reclamos',
        required: [true, 'La referencia al reclamo es obligatoria']
    },
    idDepartamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamentos',
        required: [true, 'La referencia al departamento es obligatoria']
    }
});

// Índice compuesto único para evitar duplicados en la relación
reclamosDepartamentosSchema.index({ idReclamo: 1, idDepartamento: 1 }, { unique: true });

reclamosDepartamentosSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ReclamosDepartamentosModel = mongoose.model<IReclamoDepartamento>('ReclamosDepartamentos', reclamosDepartamentosSchema, 'reclamosDepartamentos');