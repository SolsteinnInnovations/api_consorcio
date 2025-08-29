import mongoose, { Document } from 'mongoose';
export interface IExpensa extends Document {
    ordinarias: number;
    extraordinarias: number;
    idDepartamento: mongoose.Types.ObjectId;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}
export declare const ExpensasModel: mongoose.Model<IExpensa, {}, {}, {}, mongoose.Document<unknown, {}, IExpensa, {}> & IExpensa & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
