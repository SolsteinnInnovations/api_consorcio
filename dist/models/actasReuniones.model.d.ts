import mongoose, { Document } from 'mongoose';
export interface IActaReunion extends Document {
    titulo: string;
    descripcion?: string;
    fecha: Date;
    resolucion?: string;
    idEdificio: mongoose.Types.ObjectId;
}
export declare const ActasReunionesModel: mongoose.Model<IActaReunion, {}, {}, {}, mongoose.Document<unknown, {}, IActaReunion, {}> & IActaReunion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
