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
exports.ReservasModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const reservaSchema = new mongoose_1.default.Schema({
    identificacion: {
        type: String,
        required: [true, 'La identificación de la reserva es obligatoria'],
        unique: true,
        trim: true
    },
    titulo: {
        type: String,
        required: [true, 'El título de la reserva es obligatorio']
    },
    descripcion: {
        type: String
    },
    cantidadPersonas: {
        type: Number,
        min: 1
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio de la reserva es obligatoria']
    },
    fechaFin: {
        type: Date,
        required: [true, 'La fecha de fin de la reserva es obligatoria']
    },
    idPersona: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Personas',
        required: [true, 'La persona que hace la reserva es obligatoria']
    },
    idEspacio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'EspaciosComunes',
        required: [true, 'El espacio común a reservar es obligatorio']
    }
});
// Validación para evitar reservas superpuestas para el mismo espacio
reservaSchema.pre('save', async function (next) {
    const newReserva = this;
    if (newReserva.isNew || newReserva.isModified('fechaInicio') || newReserva.isModified('fechaFin') || newReserva.isModified('idEspacio')) {
        const conflictingReservation = await exports.ReservasModel.findOne({
            idEspacio: newReserva.idEspacio,
            _id: { $ne: newReserva._id }, // Excluir la propia reserva si es una actualización
            $or: [
                {
                    fechaInicio: { $lt: newReserva.fechaFin },
                    fechaFin: { $gt: newReserva.fechaInicio }
                }
            ]
        });
        if (conflictingReservation) {
            return next(new Error('Ya existe una reserva que se superpone con las fechas y el espacio seleccionado.'));
        }
    }
    if (newReserva.fechaInicio >= newReserva.fechaFin) {
        return next(new Error('La fecha de inicio debe ser anterior a la fecha de fin.'));
    }
    next();
});
reservaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.ReservasModel = mongoose_1.default.model('Reservas', reservaSchema, 'reservas');
