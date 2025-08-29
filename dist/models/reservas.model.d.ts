import mongoose, { Document } from 'mongoose';
export interface IReserva extends Document {
    identificacion: string;
    titulo: string;
    descripcion?: string;
    cantidadPersonas?: number;
    fechaInicio: Date;
    fechaFin: Date;
    idPersona: mongoose.Types.ObjectId;
    idEspacio: mongoose.Types.ObjectId;
}
export declare const ReservasModel: mongoose.Model<IReserva, {}, {}, {}, mongoose.Document<unknown, {}, IReserva, {}> & IReserva & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
