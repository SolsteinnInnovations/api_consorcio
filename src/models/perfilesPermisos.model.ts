import mongoose, { Document, Schema } from 'mongoose';
import { PerfilesModel } from './perfiles.model'; // Importa PerfilesModel
import { PermisosModel } from './permisos.model';   // Importa PermisosModel

export interface IPerfilPermiso extends Document {
    idPerfil: mongoose.Types.ObjectId; // Referencia a Perfiles
    idPermiso: mongoose.Types.ObjectId; // Referencia a Permisos
    habilitado: boolean;
}

const perfilesPermisosSchema = new mongoose.Schema<IPerfilPermiso>({
    idPerfil: {
        type: Schema.Types.ObjectId,
        ref: 'Perfiles', // Debe coincidir con el nombre del modelo de Perfiles
        required: [true, 'El perfil es obligatorio']
    },
    idPermiso: {
        type: Schema.Types.ObjectId,
        ref: 'Permisos', // Debe coincidir con el nombre del modelo de Permisos
        required: [true, 'El permiso es obligatorio']
    },
    habilitado: {
        type: Boolean,
        default: true
    }
});

// Asegura que la combinación idPerfil-idPermiso sea única
perfilesPermisosSchema.index({ idPerfil: 1, idPermiso: 1 }, { unique: true });

perfilesPermisosSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const PerfilesPermisosModel = mongoose.model<IPerfilPermiso>('PerfilesPermisos', perfilesPermisosSchema, 'perfilesPermisos');