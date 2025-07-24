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
exports.AnunciosModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const anuncioSchema = new mongoose_1.default.Schema({
    identificacion: {
        type: String,
        required: [true, 'La identificación del anuncio es obligatoria'],
        unique: true, // Cada anuncio debe tener una identificación única globalmente (o por edificio)
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título del anuncio es obligatorio']
    },
    descripcion: {
        type: String
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha del anuncio es obligatoria'],
        default: Date.now
    },
    idEdificio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Edificios',
        required: [true, 'El edificio al que pertenece el anuncio es obligatorio']
    }
});
// Considerar un índice compuesto si la identificación debe ser única SOLO por edificio
// anuncioSchema.index({ identificacion: 1, idEdificio: 1 }, { unique: true });
// Por ahora, lo dejamos único globalmente como se especificó para 'Identificacion'
anuncioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.AnunciosModel = mongoose_1.default.model('Anuncios', anuncioSchema, 'anuncios');
