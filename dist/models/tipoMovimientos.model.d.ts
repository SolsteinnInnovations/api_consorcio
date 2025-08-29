import mongoose, { Document } from 'mongoose';
export interface ITipoMovimiento extends Document {
    descripcion: string;
    idEdificio?: mongoose.Types.ObjectId;
}
export declare const TipoMovimientosModel: mongoose.Model<ITipoMovimiento, {}, {}, {}, mongoose.Document<unknown, {}, ITipoMovimiento, {}> & ITipoMovimiento & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
