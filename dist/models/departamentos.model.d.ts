import mongoose, { Document } from 'mongoose';
export interface IDepartamento extends Document {
    identificacion: string;
    piso?: number;
    descripcion?: string;
    ocupado: boolean;
    idPersona?: mongoose.Types.ObjectId;
    idEdificio: mongoose.Types.ObjectId;
}
export declare const DepartamentosModel: mongoose.Model<IDepartamento, {}, {}, {}, mongoose.Document<unknown, {}, IDepartamento, {}> & IDepartamento & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
