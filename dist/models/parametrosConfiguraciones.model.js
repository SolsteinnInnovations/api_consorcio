"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosConfiguracionesModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ParametroConfiguracionSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del parámetro es obligatorio'],
        unique: true // Asumo que el nombre del parámetro debe ser único
    },
    valor: {
        type: String,
        required: [true, 'El valor del parámetro es obligatorio']
    },
    interno: {
        type: Boolean,
        default: false // Por defecto, un parámetro no es interno
    },
    idEdificio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Edificio', // Referencia al modelo 'Edificio' que crearás después
        required: false // Puede ser opcional si el parámetro es global y no de un edificio específico
    }
});
ParametroConfiguracionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
// Cambiar 'ParametroConfiguracionModel' a 'ParametrosConfiguracionesModel' y 'ParametroConfiguracion' a 'ParametrosConfiguraciones' en el nombre de la colección
exports.ParametrosConfiguracionesModel = mongoose_1.default.model('ParametrosConfiguracion', ParametroConfiguracionSchema, 'parametrosconfiguraciones');
//# sourceMappingURL=parametrosConfiguraciones.model.js.map