"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntidadAsociadaModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const entidadAsociadaSchema = new mongoose_1.default.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción de la entidad asociada es obligatoria'],
        unique: true
    }
});
entidadAsociadaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.EntidadAsociadaModel = mongoose_1.default.model('EntidadAsociada', entidadAsociadaSchema, 'entidadAsociada');
//# sourceMappingURL=entidadAsociada.model.js.map