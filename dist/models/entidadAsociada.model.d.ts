import mongoose, { Document } from 'mongoose';
export interface IEntidadAsociada extends Document {
    descripcion: string;
}
export declare const EntidadAsociadaModel: mongoose.Model<IEntidadAsociada, {}, {}, {}, mongoose.Document<unknown, {}, IEntidadAsociada, {}> & IEntidadAsociada & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
