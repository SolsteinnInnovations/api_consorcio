import mongoose, { Document } from 'mongoose';
export interface IEspacioComun extends Document {
    identificacion: string;
    titulo: string;
    habilitado: boolean;
    idEdificio: mongoose.Types.ObjectId;
}
export declare const EspaciosComunesModel: mongoose.Model<IEspacioComun, {}, {}, {}, mongoose.Document<unknown, {}, IEspacioComun, {}> & IEspacioComun & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
