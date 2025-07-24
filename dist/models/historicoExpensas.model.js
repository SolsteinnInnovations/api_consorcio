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
exports.HistoricoExpensasModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const historicoExpensaSchema = new mongoose_1.default.Schema({
    idExpensa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Expensas', // Debe coincidir con el nombre del modelo de Expensas
        required: [true, 'La referencia al registro de expensas principal es obligatoria']
    },
    idDepartamento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Departamentos', // Nombre de la colección de Departamentos (ahora activa)
        required: [true, 'El departamento es obligatorio']
    },
    ordinarias: {
        type: Number,
        required: [true, 'El monto de expensas ordinarias históricas es obligatorio'],
        min: 0
    },
    extraordinarias: {
        type: Number,
        required: [true, 'El monto de expensas extraordinarias históricas es obligatorio'],
        min: 0
    }
}, {
    timestamps: { createdAt: 'fechaRegistro', updatedAt: false } // Solo queremos fechaRegistro para el histórico
});
historicoExpensaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.HistoricoExpensasModel = mongoose_1.default.model('HistoricoExpensas', historicoExpensaSchema, 'historicoExpensas');
