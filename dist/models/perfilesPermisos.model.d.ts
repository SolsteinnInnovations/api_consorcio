import mongoose, { Document } from 'mongoose';
export interface IPerfilPermiso extends Document {
    idPerfil: mongoose.Types.ObjectId;
    idPermiso: mongoose.Types.ObjectId;
    habilitado: boolean;
}
export declare const PerfilesPermisosModel: mongoose.Model<IPerfilPermiso, {}, {}, {}, mongoose.Document<unknown, {}, IPerfilPermiso, {}> & IPerfilPermiso & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
