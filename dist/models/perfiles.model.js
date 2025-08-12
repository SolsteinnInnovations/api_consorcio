"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const perfilSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del perfil es obligatorio'],
        unique: true,
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del perfil es obligatoria'],
        unique: true,
    },
    habilitado: {
        type: Boolean,
        default: true,
    },
});
perfilSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
// Cambiar 'PerfilModel' a 'PerfilesModel' y 'Perfil' a 'Perfiles' en el nombre de la colección
exports.PerfilesModel = mongoose_1.default.model('Perfiles', perfilSchema);
