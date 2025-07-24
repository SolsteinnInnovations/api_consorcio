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
exports.ExpensasModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const expensaSchema = new mongoose_1.default.Schema({
    ordinarias: {
        type: Number,
        required: [true, 'El monto de expensas ordinarias es obligatorio'],
        min: 0
    },
    extraordinarias: {
        type: Number,
        required: [true, 'El monto de expensas extraordinarias es obligatorio'],
        min: 0
    },
    idDepartamento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Departamentos', // Nombre de la colección de Departamentos (futura)
        required: [true, 'El departamento es obligatorio'],
        unique: true // Asumo que un departamento solo tiene un registro de expensas actual
    }
}, {
    timestamps: true // Esto agrega automáticamente createdAt y updatedAt
});
expensaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.ExpensasModel = mongoose_1.default.model('Expensas', expensaSchema, 'expensas');
