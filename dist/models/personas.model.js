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
exports.PersonasModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const personaSchema = new mongoose_1.default.Schema({
    nombres: {
        type: String,
        required: [true, 'Los nombres son obligatorios']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios']
    },
    correoElectronico: {
        type: String,
        unique: true, // Debe ser único si se proporciona
        sparse: true, // Permite múltiples documentos con valor null para correoElectronico
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Por favor, ingrese un correo electrónico válido'] // Validación de formato
    },
    idTipoDocumento: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'TipoDocumentos',
        required: [true, 'El tipo de documento es obligatorio']
    },
    documento: {
        type: String,
        required: [true, 'El número de documento es obligatorio'],
        unique: true
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    idLocalidad: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Localidades',
        required: false
    },
    encargado: {
        type: Boolean,
        default: false
    },
    idUsuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: false,
        unique: true, // Un usuario solo puede estar asociado a una persona
        sparse: true // Permite que idUsuario sea nulo para múltiples personas
    }
});
personaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.PersonasModel = mongoose_1.default.model('Personas', personaSchema, 'personas');
//# sourceMappingURL=personas.model.js.map