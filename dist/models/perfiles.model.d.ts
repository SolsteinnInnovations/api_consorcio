import mongoose, { Document } from 'mongoose';
export interface IPerfil extends Document {
    descripcion: string;
    nombre: string;
    habilitado?: boolean;
}
export declare const PerfilesModel: mongoose.Model<IPerfil, {}, {}, {}, mongoose.Document<unknown, {}, IPerfil, {}> & IPerfil & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
