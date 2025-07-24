import mongoose, { Document, Schema } from 'mongoose';
import { ItemsMenuModel } from './itemsMenu.model'; // Importa el modelo de ItemsMenu

export interface IPermiso extends Document {
    descripcion: string;
    idItemMenu: mongoose.Types.ObjectId; // Referencia a ItemsMenu
}

const permisoSchema = new mongoose.Schema<IPermiso>({
    descripcion: {
        type: String,
        required: [true, 'La descripción del permiso es obligatoria'],
        unique: true
    },
    idItemMenu: {
        type: Schema.Types.ObjectId,
        ref: 'ItemsMenu', // Debe coincidir con el nombre del modelo de ItemsMenu
        required: [true, 'El ítem de menú asociado es obligatorio']
    }
});

permisoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const PermisosModel = mongoose.model<IPermiso>('Permisos', permisoSchema, 'permisos');