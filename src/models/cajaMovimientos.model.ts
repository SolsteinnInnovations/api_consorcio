import mongoose, { Document, Schema } from 'mongoose';
import { ReclamosModel } from './reclamos.model';           // Ya existente
import { TipoMovimientosModel } from './tipoMovimientos.model'; // Ya existente
import { EdificiosModel } from './edificios.model';         // Ya existente

export interface ICajaMovimiento extends Document {
    descripcion: string;
    ingreso: number;
    egreso: number;
    saldoAnterior: number; // Saldo de la caja antes de este movimiento
    saldoActual: number;   // Saldo de la caja después de este movimiento
    fechaMovimiento: Date;
    idReclamo?: mongoose.Types.ObjectId; // Puede ser nulo
    idTipoMovimiento: mongoose.Types.ObjectId;
    idEdificio: mongoose.Types.ObjectId;
}

const cajaMovimientoSchema = new mongoose.Schema<ICajaMovimiento>({
    descripcion: {
        type: String,
        required: [true, 'La descripción del movimiento es obligatoria'],
        trim: true
    },
    ingreso: {
        type: Number,
        default: 0,
        min: 0
    },
    egreso: {
        type: Number,
        default: 0,
        min: 0
    },
    saldoAnterior: {
        type: Number,
        required: [true, 'El saldo anterior es obligatorio']
    },
    saldoActual: {
        type: Number,
        required: [true, 'El saldo actual es obligatorio']
    },
    fechaMovimiento: {
        type: Date,
        required: [true, 'La fecha del movimiento es obligatoria'],
        default: Date.now
    },
    idReclamo: {
        type: Schema.Types.ObjectId,
        ref: 'Reclamos',
        required: false
    },
    idTipoMovimiento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoMovimientos',
        required: [true, 'El tipo de movimiento es obligatorio']
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio es obligatorio']
    }
});

// Validación para asegurar que solo se especifique ingreso o egreso, no ambos
cajaMovimientoSchema.pre('validate', function (next) {
    if (this.ingreso > 0 && this.egreso > 0) {
        return next(new Error('No se puede especificar un ingreso y un egreso al mismo tiempo.'));
    }
    if (this.ingreso === 0 && this.egreso === 0) {
        return next(new Error('Debe especificar un monto para el ingreso o el egreso.'));
    }
    next();
});

cajaMovimientoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const CajaMovimientosModel = mongoose.model<ICajaMovimiento>('CajaMovimientos', cajaMovimientoSchema, 'cajaMovimientos');