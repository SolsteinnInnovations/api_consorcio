import mongoose, { Document, Schema } from 'mongoose';

export interface ITipoMovimiento extends Document {
    descripcion: string;
    idEdificio?: mongoose.Types.ObjectId; // Referencia a Edificios (futura)
}

const tipoMovimientoSchema = new mongoose.Schema<ITipoMovimiento>({
    descripcion: {
        type: String,
        required: [true, 'La descripción del tipo de movimiento es obligatoria'],
        unique: true
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios', // Nombre de la colección de Edificios (futura)
        required: false // Puede ser un tipo de movimiento global o específico de un edificio
    }
});

tipoMovimientoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const TipoMovimientosModel = mongoose.model<ITipoMovimiento>('TipoMovimientos', tipoMovimientoSchema, 'tipoMovimientos');