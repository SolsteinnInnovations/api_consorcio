import mongoose, { Document, Schema } from 'mongoose';

export interface IPerfil extends Document {
    descripcion: string;
    nombre: string;
    habilitado?: boolean;
}

const perfilSchema = new mongoose.Schema<IPerfil>({
    nombre: {
        type: String,
        required: [true, 'El nombre del perfil es obligatorio'],
        unique: true,
    }   ,
    descripcion: {
        type: String,
        required: [true, 'La descripción del perfil es obligatoria'],
        unique: true,
    },
    habilitado: {
        type: Boolean,
        default: true,
    },
});

perfilSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

// Cambiar 'PerfilModel' a 'PerfilesModel' y 'Perfil' a 'Perfiles' en el nombre de la colección
export const PerfilesModel = mongoose.model<IPerfil>('Perfiles', perfilSchema);