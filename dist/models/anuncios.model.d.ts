import mongoose, { Document } from 'mongoose';
export interface IAnuncio extends Document {
    identificacion: string;
    titulo: string;
    descripcion?: string;
    fecha: Date;
    idEdificio: mongoose.Types.ObjectId;
}
export declare const AnunciosModel: mongoose.Model<IAnuncio, {}, {}, {}, mongoose.Document<unknown, {}, IAnuncio, {}> & IAnuncio & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
