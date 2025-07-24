import mongoose, { Document, Schema } from 'mongoose';

export interface IEntidadAsociada extends Document {
    descripcion: string;
}

const entidadAsociadaSchema = new mongoose.Schema<IEntidadAsociada>({
    descripcion: {
        type: String,
        required: [true, 'La descripción de la entidad asociada es obligatoria'],
        unique: true
    }
});

entidadAsociadaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const EntidadAsociadaModel = mongoose.model<IEntidadAsociada>('EntidadAsociada', entidadAsociadaSchema, 'entidadAsociada');