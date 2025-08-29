import mongoose, { Document } from 'mongoose';
export interface IItemMenu extends Document {
    descripcion: string;
    habilitado: boolean;
}
export declare const ItemsMenuModel: mongoose.Model<IItemMenu, {}, {}, {}, mongoose.Document<unknown, {}, IItemMenu, {}> & IItemMenu & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
