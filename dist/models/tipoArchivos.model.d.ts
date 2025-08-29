import mongoose, { Document } from 'mongoose';
export interface ITipoArchivo extends Document {
    descripcion: string;
    idEdificio?: mongoose.Types.ObjectId;
}
export declare const TipoArchivosModel: mongoose.Model<ITipoArchivo, {}, {}, {}, mongoose.Document<unknown, {}, ITipoArchivo, {}> & ITipoArchivo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
