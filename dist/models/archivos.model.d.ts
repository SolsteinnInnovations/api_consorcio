import mongoose, { Document } from 'mongoose';
export interface IArchivo extends Document {
    archivo: string;
    idEntidad: string;
    idEntidadAsociada: mongoose.Types.ObjectId;
    idTipoArchivo: mongoose.Types.ObjectId;
    nombreArchivo?: string;
    mimeType?: string;
}
export declare const ArchivosModel: mongoose.Model<IArchivo, {}, {}, {}, mongoose.Document<unknown, {}, IArchivo, {}> & IArchivo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
