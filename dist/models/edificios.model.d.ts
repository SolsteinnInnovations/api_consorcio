import mongoose, { Document } from 'mongoose';
export interface IEdificio extends Document {
    direccion: string;
    idLocalidad: mongoose.Types.ObjectId;
    identificadorEdificio: string;
}
export declare const EdificiosModel: mongoose.Model<IEdificio, {}, {}, {}, mongoose.Document<unknown, {}, IEdificio, {}> & IEdificio & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
