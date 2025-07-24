"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paisSchema = new mongoose_1.default.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción del país es obligatoria'],
        unique: true
    }
});
paisSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.PaisesModel = mongoose_1.default.model('Paises', paisSchema, 'paises');
