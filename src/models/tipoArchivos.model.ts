import mongoose, { Document, Schema } from 'mongoose';

export interface ITipoArchivo extends Document {
    descripcion: string;
    idEdificio?: mongoose.Types.ObjectId; // Referencia a Edificios (futura)
}

const tipoArchivoSchema = new mongoose.Schema<ITipoArchivo>({
    descripcion: {
        type: String,
        required: [true, 'La descripción del tipo de archivo es obligatoria'],
        unique: true
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificios', // Nombre de la colección de Edificios (futura)
        required: false // Puede ser un tipo de archivo global o específico de un edificio
    }
});

tipoArchivoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const TipoArchivosModel = mongoose.model<ITipoArchivo>('TipoArchivos', tipoArchivoSchema, 'tipoArchivos');