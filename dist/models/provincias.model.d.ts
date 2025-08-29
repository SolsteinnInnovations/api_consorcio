import mongoose, { Document } from 'mongoose';
export interface IProvincia extends Document {
    nombre: string;
    idPais: mongoose.Types.ObjectId;
}
export declare const ProvinciasModel: mongoose.Model<IProvincia, {}, {}, {}, mongoose.Document<unknown, {}, IProvincia, {}> & IProvincia & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
