import mongoose, { Document } from 'mongoose';
export interface IParametroConfiguracion extends Document {
    nombre: string;
    valor: string;
    interno: boolean;
    idEdificio?: mongoose.Types.ObjectId;
}
export declare const ParametrosConfiguracionesModel: mongoose.Model<IParametroConfiguracion, {}, {}, {}, mongoose.Document<unknown, {}, IParametroConfiguracion, {}> & IParametroConfiguracion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
