import mongoose, { Document } from 'mongoose';
export interface ITipoDocumento extends Document {
    descripcion: string;
}
export declare const TipoDocumentosModel: mongoose.Model<ITipoDocumento, {}, {}, {}, mongoose.Document<unknown, {}, ITipoDocumento, {}> & ITipoDocumento & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
