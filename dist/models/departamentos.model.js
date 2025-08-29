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
exports.DepartamentosModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const departamentoSchema = new mongoose_1.default.Schema({
    identificacion: {
        type: String,
        required: [true, 'La identificación del departamento es obligatoria']
    },
    piso: {
        type: Number,
        min: 0, // Puede ser 0 para planta baja
        required: false
    },
    descripcion: {
        type: String
    },
    ocupado: {
        type: Boolean,
        default: false
    },
    idPersona: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Personas',
        required: false, // Puede ser nulo si no está ocupado
        unique: true, // Una persona solo puede ocupar un departamento a la vez
        sparse: true // Permite múltiples documentos con valor null para idPersona
    },
    idEdificio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio al que pertenece el departamento es obligatorio']
    }
});
// Índice compuesto único para asegurar que la identificación de departamento sea única DENTRO de un edificio
departamentoSchema.index({ identificacion: 1, idEdificio: 1 }, { unique: true });
departamentoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.DepartamentosModel = mongoose_1.default.model('Departamentos', departamentoSchema, 'departamentos');
//# sourceMappingURL=departamentos.model.js.map