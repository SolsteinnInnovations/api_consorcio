import mongoose, { Document } from 'mongoose';
export interface IPermiso extends Document {
    descripcion: string;
    idItemMenu: mongoose.Types.ObjectId;
}
export declare const PermisosModel: mongoose.Model<IPermiso, {}, {}, {}, mongoose.Document<unknown, {}, IPermiso, {}> & IPermiso & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
