import mongoose, { Document, Schema } from 'mongoose';
import { TipoDocumentosModel } from './tipoDocumentos.model'; // Ya existente
import { LocalidadesModel } from './localidades.model';     // Ya existente
import { UsuariosModel } from './usuarios.model';         // Ya existente

export interface IPersona extends Document {
    nombres: string;
    apellidos: string;
    correoElectronico?: string;
    idTipoDocumento: mongoose.Types.ObjectId;
    documento: string;
    telefono?: string;
    direccion?: string;
    idLocalidad?: mongoose.Types.ObjectId;
    encargado: boolean; // Indica si la persona es encargada de un edificio
    idUsuario?: mongoose.Types.ObjectId; // Referencia al usuario asociado (puede ser null)
}

const personaSchema = new mongoose.Schema<IPersona>({
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
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'Localidades',
        required: false
    },
    encargado: {
        type: Boolean,
        default: false
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: false,
        unique: true, // Un usuario solo puede estar asociado a una persona
        sparse: true // Permite que idUsuario sea nulo para múltiples personas
    }
});

personaSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const PersonasModel = mongoose.model<IPersona>('Personas', personaSchema, 'personas');