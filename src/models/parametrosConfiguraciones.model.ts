import mongoose, { Document, Schema } from 'mongoose';

export interface IParametroConfiguracion extends Document {
    nombre: string;
    valor: string;
    interno: boolean;
    idEdificio?: mongoose.Types.ObjectId; // Referencia a Edificio (aún no creado)
}

const ParametroConfiguracionSchema = new mongoose.Schema<IParametroConfiguracion>({
    nombre: {
        type: String,
        required: [true, 'El nombre del parámetro es obligatorio'],
        unique: true // Asumo que el nombre del parámetro debe ser único
    },
    valor: {
        type: String,
        required: [true, 'El valor del parámetro es obligatorio']
    },
    interno: {
        type: Boolean,
        default: false // Por defecto, un parámetro no es interno
    },
    idEdificio: {
        type: Schema.Types.ObjectId,
        ref: 'Edificio', // Referencia al modelo 'Edificio' que crearás después
        required: false // Puede ser opcional si el parámetro es global y no de un edificio específico
    }
});

ParametroConfiguracionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

// Cambiar 'ParametroConfiguracionModel' a 'ParametrosConfiguracionesModel' y 'ParametroConfiguracion' a 'ParametrosConfiguraciones' en el nombre de la colección
export const ParametrosConfiguracionesModel = mongoose.model<IParametroConfiguracion>('ParametrosConfiguracion', ParametroConfiguracionSchema, 'parametrosconfiguraciones');