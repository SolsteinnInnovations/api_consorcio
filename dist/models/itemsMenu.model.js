"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsMenuModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const itemMenuSchema = new mongoose_1.default.Schema({
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
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.ItemsMenuModel = mongoose_1.default.model('ItemsMenu', itemMenuSchema, 'itemsMenu');
