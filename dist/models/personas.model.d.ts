import mongoose, { Document } from 'mongoose';
export interface IPersona extends Document {
    nombres: string;
    apellidos: string;
    correoElectronico?: string;
    idTipoDocumento: mongoose.Types.ObjectId;
    documento: string;
    telefono?: string;
    direccion?: string;
    idLocalidad?: mongoose.Types.ObjectId;
    encargado: boolean;
    idUsuario?: mongoose.Types.ObjectId;
}
export declare const PersonasModel: mongoose.Model<IPersona, {}, {}, {}, mongoose.Document<unknown, {}, IPersona, {}> & IPersona & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
