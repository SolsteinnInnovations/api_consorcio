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
exports.ReclamosModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const reclamoSchema = new mongoose_1.default.Schema({
    identificacion: {
        type: String,
        required: [true, 'La identificación del reclamo es obligatoria'],
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título del reclamo es obligatorio']
    },
    descripcion: {
        type: String
    },
    resolucion: {
        type: String
    },
    idCajaMovimiento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CajaMovimientos', // Nombre de la colección de CajaMovimientos (ahora activa)
        required: false // Puede ser opcional, según tu lógica de negocio
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio del reclamo es obligatoria'],
        default: Date.now // Establece la fecha actual por defecto al crear
    },
    fechaFin: {
        type: Date,
        required: false
    }
});
reclamoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.ReclamosModel = mongoose_1.default.model('Reclamos', reclamoSchema, 'reclamos');
