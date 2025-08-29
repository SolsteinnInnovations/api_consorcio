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
exports.UsuariosModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const usuarioSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    habilitado: {
        type: Boolean,
        default: true,
    },
    idPerfil: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Perfiles', // ¡IMPORTANTE! Asegúrate de que este 'Perfiles' coincida con el nombre del modelo que exportaste.
        required: [true, 'El perfil es obligatorio'],
    },
    idEdificio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Edificios', // ¡IMPORTANTE! Asegúrate de que este 'Perfiles' coincida con el nombre del modelo que exportaste.
        required: [true, 'El perfil es obligatorio'],
    },
});
usuarioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.password; // Generalmente no queremos enviar la contraseña hasheada en las respuestas
    },
});
// Cambiar 'UsuarioModel' a 'UsuariosModel' y 'Usuario' a 'Usuarios' en el nombre de la colección
exports.UsuariosModel = mongoose_1.default.model('Usuarios', usuarioSchema);
//# sourceMappingURL=usuarios.model.js.map