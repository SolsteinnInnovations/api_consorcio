import mongoose, { Document, Schema } from 'mongoose';
import { PersonasModel } from './personas.model';         // Ya existente
import { EspaciosComunesModel } from './espaciosComunes.model'; // Recién creada

export interface IReserva extends Document {
    identificacion: string;
    titulo: string;
    descripcion?: string;
    cantidadPersonas?: number;
    fechaInicio: Date;
    fechaFin: Date;
    idPersona: mongoose.Types.ObjectId; // Persona que hace la reserva
    idEspacio: mongoose.Types.ObjectId; // Espacio común reservado
}

const reservaSchema = new mongoose.Schema<IReserva>({
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
        type: Schema.Types.ObjectId,
        ref: 'Personas',
        required: [true, 'La persona que hace la reserva es obligatoria']
    },
    idEspacio: {
        type: Schema.Types.ObjectId,
        ref: 'EspaciosComunes',
        required: [true, 'El espacio común a reservar es obligatorio']
    }
});

// Validación para evitar reservas superpuestas para el mismo espacio
reservaSchema.pre('save', async function (next) {
    const newReserva = this as IReserva;
    if (newReserva.isNew || newReserva.isModified('fechaInicio') || newReserva.isModified('fechaFin') || newReserva.isModified('idEspacio')) {
        const conflictingReservation = await ReservasModel.findOne({
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
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ReservasModel = mongoose.model<IReserva>('Reservas', reservaSchema, 'reservas');