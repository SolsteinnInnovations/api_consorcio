import mongoose, { Document } from 'mongoose';
export interface IPais extends Document {
    nombre: string;
}
export declare const PaisesModel: mongoose.Model<IPais, {}, {}, {}, mongoose.Document<unknown, {}, IPais, {}> & IPais & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
