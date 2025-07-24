import mongoose, { Document, Schema } from 'mongoose';
import { CajaMovimientosModel } from './cajaMovimientos.model';

export interface IReclamo extends Document {
    identificacion: string;
    titulo: string;
    descripcion?: string;
    resolucion?: string;
    idCajaMovimiento?: mongoose.Types.ObjectId;
    fechaInicio: Date;
    fechaFin?: Date;
}

const reclamoSchema = new mongoose.Schema<IReclamo>({
    identificacion: {
        type: String,
        required: [true, 'La identificación del reclamo es obligatoria'],
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título del reclamo es obligatorio']
    },
    descripcion: {
        type: String
    },
    resolucion: {
        type: String
    },
    idCajaMovimiento: {
        type: Schema.Types.ObjectId,
        ref: 'CajaMovimientos', // Nombre de la colección de CajaMovimientos (ahora activa)
        required: false // Puede ser opcional, según tu lógica de negocio
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio del reclamo es obligatoria'],
        default: Date.now // Establece la fecha actual por defecto al crear
    },
    fechaFin: {
        type: Date,
        required: false
    }
});

reclamoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ReclamosModel = mongoose.model<IReclamo>('Reclamos', reclamoSchema, 'reclamos');