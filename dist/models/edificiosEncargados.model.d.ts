import mongoose, { Document } from 'mongoose';
export interface IEdificioEncargado extends Document {
    idPersona: mongoose.Types.ObjectId;
    idEdificio: mongoose.Types.ObjectId;
}
export declare const EdificiosEncargadosModel: mongoose.Model<IEdificioEncargado, {}, {}, {}, mongoose.Document<unknown, {}, IEdificioEncargado, {}> & IEdificioEncargado & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
