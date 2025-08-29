import mongoose, { Document } from 'mongoose';
export interface ILocalidad extends Document {
    nombre: string;
    codigoPostal: string;
    idProvincia: mongoose.Types.ObjectId;
}
export declare const LocalidadesModel: mongoose.Model<ILocalidad, {}, {}, {}, mongoose.Document<unknown, {}, ILocalidad, {}> & ILocalidad & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
