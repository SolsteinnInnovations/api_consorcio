import mongoose, { Document } from 'mongoose';
export interface IReclamo extends Document {
    identificacion: string;
    titulo: string;
    descripcion?: string;
    resolucion?: string;
    idCajaMovimiento?: mongoose.Types.ObjectId;
    fechaInicio: Date;
    fechaFin?: Date;
}
export declare const ReclamosModel: mongoose.Model<IReclamo, {}, {}, {}, mongoose.Document<unknown, {}, IReclamo, {}> & IReclamo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
