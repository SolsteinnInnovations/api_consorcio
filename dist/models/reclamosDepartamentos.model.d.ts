import mongoose, { Document } from 'mongoose';
export interface IReclamoDepartamento extends Document {
    idReclamo: mongoose.Types.ObjectId;
    idDepartamento: mongoose.Types.ObjectId;
}
export declare const ReclamosDepartamentosModel: mongoose.Model<IReclamoDepartamento, {}, {}, {}, mongoose.Document<unknown, {}, IReclamoDepartamento, {}> & IReclamoDepartamento & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
