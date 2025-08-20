import mongoose, { Document, Schema } from 'mongoose';

export interface IPais extends Document {
    nombre: string;
}

const paisSchema = new mongoose.Schema<IPais>({
    nombre: {
        type: String,
        required: [true, 'El nombre del país es obligatoria'],
        unique: true
    }
});

paisSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const PaisesModel = mongoose.model<IPais>('Paises', paisSchema, 'paises');