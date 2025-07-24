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
exports.CajaMovimientosModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const cajaMovimientoSchema = new mongoose_1.default.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción del movimiento es obligatoria'],
        trim: true
    },
    ingreso: {
        type: Number,
        default: 0,
        min: 0
    },
    egreso: {
        type: Number,
        default: 0,
        min: 0
    },
    saldoAnterior: {
        type: Number,
        required: [true, 'El saldo anterior es obligatorio']
    },
    saldoActual: {
        type: Number,
        required: [true, 'El saldo actual es obligatorio']
    },
    fechaMovimiento: {
        type: Date,
        required: [true, 'La fecha del movimiento es obligatoria'],
        default: Date.now
    },
    idReclamo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Reclamos',
        required: false
    },
    idTipoMovimiento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'TipoMovimientos',
        required: [true, 'El tipo de movimiento es obligatorio']
    },
    idEdificio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio es obligatorio']
    }
});
// Validación para asegurar que solo se especifique ingreso o egreso, no ambos
cajaMovimientoSchema.pre('validate', function (next) {
    if (this.ingreso > 0 && this.egreso > 0) {
        return next(new Error('No se puede especificar un ingreso y un egreso al mismo tiempo.'));
    }
    if (this.ingreso === 0 && this.egreso === 0) {
        return next(new Error('Debe especificar un monto para el ingreso o el egreso.'));
    }
    next();
});
cajaMovimientoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.CajaMovimientosModel = mongoose_1.default.model('CajaMovimientos', cajaMovimientoSchema, 'cajaMovimientos');
