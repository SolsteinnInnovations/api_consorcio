import mongoose, { Document, Schema } from 'mongoose';

// Importa el modelo PerfilesModel para la referencia
import { PerfilesModel } from './perfiles.model';

export interface IUsuario extends Document {
    login: string;
    password?: string; // Hacemos la contraseña opcional en la interfaz para poder trabajar con ella sin incluirla siempre.
    habilitado?: boolean;
    idPerfil: mongoose.Types.ObjectId; // Referencia a la entidad Perfiles
}

const usuarioSchema = new mongoose.Schema<IUsuario>({
    login: {
        type: String,
        required: [true, 'El login es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    habilitado: {
        type: Boolean,
        default: true,
    },
    idPerfil: {
        type: Schema.Types.ObjectId,
        ref: 'Perfiles', // ¡IMPORTANTE! Asegúrate de que este 'Perfiles' coincida con el nombre del modelo que exportaste.
        required: [true, 'El perfil es obligatorio'],
    },
});

usuarioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
        delete ret.password; // Generalmente no queremos enviar la contraseña hasheada en las respuestas
    },
});

// Cambiar 'UsuarioModel' a 'UsuariosModel' y 'Usuario' a 'Usuarios' en el nombre de la colección
export const UsuariosModel = mongoose.model<IUsuario>('Usuarios', usuarioSchema);