import mongoose, { Document } from 'mongoose';
export interface ICajaMovimiento extends Document {
    descripcion: string;
    ingreso: number;
    egreso: number;
    saldoAnterior: number;
    saldoActual: number;
    fechaMovimiento: Date;
    idReclamo?: mongoose.Types.ObjectId;
    idTipoMovimiento: mongoose.Types.ObjectId;
    idEdificio: mongoose.Types.ObjectId;
}
export declare const CajaMovimientosModel: mongoose.Model<ICajaMovimiento, {}, {}, {}, mongoose.Document<unknown, {}, ICajaMovimiento, {}> & ICajaMovimiento & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
