import mongoose, { Document } from 'mongoose';
export interface IHistoricoExpensa extends Document {
    idExpensa: mongoose.Types.ObjectId;
    idDepartamento: mongoose.Types.ObjectId;
    ordinarias: number;
    extraordinarias: number;
    fechaRegistro?: Date;
}
export declare const HistoricoExpensasModel: mongoose.Model<IHistoricoExpensa, {}, {}, {}, mongoose.Document<unknown, {}, IHistoricoExpensa, {}> & IHistoricoExpensa & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
