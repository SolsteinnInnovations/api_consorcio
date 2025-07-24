import mongoose, { Document, Schema } from 'mongoose';
import { ExpensasModel } from './expensas.model'; // Importa el modelo de Expensas
import { DepartamentosModel } from './departamentos.model';

export interface IHistoricoExpensa extends Document {
    idExpensa: mongoose.Types.ObjectId; // Referencia a Expensas
    idDepartamento: mongoose.Types.ObjectId; // Referencia a Departamentos (ahora activa)
    ordinarias: number;
    extraordinarias: number;
    fechaRegistro?: Date;
}

const historicoExpensaSchema = new mongoose.Schema<IHistoricoExpensa>({
    idExpensa: {
        type: Schema.Types.ObjectId,
        ref: 'Expensas', // Debe coincidir con el nombre del modelo de Expensas
        required: [true, 'La referencia al registro de expensas principal es obligatoria']
    },
    idDepartamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamentos', // Nombre de la colección de Departamentos (ahora activa)
        required: [true, 'El departamento es obligatorio']
    },
    ordinarias: {
        type: Number,
        required: [true, 'El monto de expensas ordinarias históricas es obligatorio'],
        min: 0
    },
    extraordinarias: {
        type: Number,
        required: [true, 'El monto de expensas extraordinarias históricas es obligatorio'],
        min: 0
    }
}, {
    timestamps: { createdAt: 'fechaRegistro', updatedAt: false } // Solo queremos fechaRegistro para el histórico
});

historicoExpensaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const HistoricoExpensasModel = mongoose.model<IHistoricoExpensa>('HistoricoExpensas', historicoExpensaSchema, 'historicoExpensas');