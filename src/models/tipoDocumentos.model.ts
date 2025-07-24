import mongoose, { Document, Schema } from 'mongoose';

export interface ITipoDocumento extends Document {
    descripcion: string;
}

const tipoDocumentoSchema = new mongoose.Schema<ITipoDocumento>({
    descripcion: {
        type: String,
        required: [true, 'La descripción del tipo de documento es obligatoria'],
        unique: true
    }
});

tipoDocumentoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const TipoDocumentosModel = mongoose.model<ITipoDocumento>('TipoDocumentos', tipoDocumentoSchema, 'tipoDocumentos');