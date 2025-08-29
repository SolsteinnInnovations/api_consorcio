"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDocumentosModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tipoDocumentoSchema = new mongoose_1.default.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción del tipo de documento es obligatoria'],
        unique: true
    }
});
tipoDocumentoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.TipoDocumentosModel = mongoose_1.default.model('TipoDocumentos', tipoDocumentoSchema, 'tipoDocumentos');
//# sourceMappingURL=tipoDocumentos.model.js.map