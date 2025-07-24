import mongoose, { Document, Schema } from 'mongoose';

export interface IItemMenu extends Document {
    descripcion: string;
    habilitado: boolean;
}

const itemMenuSchema = new mongoose.Schema<IItemMenu>({
    descripcion: {
        type: String,
        required: [true, 'La descripción del ítem de menú es obligatoria'],
        unique: true
    },
    habilitado: {
        type: Boolean,
        default: true
    }
});

itemMenuSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ItemsMenuModel = mongoose.model<IItemMenu>('ItemsMenu', itemMenuSchema, 'itemsMenu');