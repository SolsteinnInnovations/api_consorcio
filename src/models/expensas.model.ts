import mongoose, { Document, Schema } from 'mongoose';

export interface IExpensa extends Document {
    ordinarias: number;
    extraordinarias: number;
    idDepartamento: mongoose.Types.ObjectId; // Referencia a Departamentos (futura)
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}

const expensaSchema = new mongoose.Schema<IExpensa>({
    ordinarias: {
        type: Number,
        required: [true, 'El monto de expensas ordinarias es obligatorio'],
        min: 0
    },
    extraordinarias: {
        type: Number,
        required: [true, 'El monto de expensas extraordinarias es obligatorio'],
        min: 0
    },
    idDepartamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamentos', // Nombre de la colección de Departamentos (futura)
        required: [true, 'El departamento es obligatorio'],
        unique: true // Asumo que un departamento solo tiene un registro de expensas actual
    }
}, {
    timestamps: true // Esto agrega automáticamente createdAt y updatedAt
});

expensaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ExpensasModel = mongoose.model<IExpensa>('Expensas', expensaSchema, 'expensas');