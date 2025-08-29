import mongoose, { Document } from 'mongoose';
export interface IUsuario extends Document {
    email: string;
    password?: string;
    habilitado?: boolean;
    idPerfil: mongoose.Types.ObjectId;
    idEdificio?: mongoose.Types.ObjectId;
}
export declare const UsuariosModel: mongoose.Model<IUsuario, {}, {}, {}, mongoose.Document<unknown, {}, IUsuario, {}> & IUsuario & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
