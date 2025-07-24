import mongoose, { Document, Schema } from 'mongoose';
import { EntidadAsociadaModel } from './entidadAsociada.model'; // Ya existente
import { TipoArchivosModel } from './tipoArchivos.model';     // Ya existente

export interface IArchivo extends Document {
    archivo: string; // Archivo en base64 (o URL/ruta si se guarda en disco)
    idEntidad: string; // ID de la entidad a la que se asocia (ej. ID de Reclamo, ID de Persona)
    idEntidadAsociada: mongoose.Types.ObjectId; // Referencia a EntidadAsociada (ej. "Reclamo", "Persona")
    idTipoArchivo: mongoose.Types.ObjectId; // Referencia a TipoArchivos
    nombreArchivo?: string; // Nombre original del archivo
    mimeType?: string; // Tipo MIME del archivo
}

const archivoSchema = new mongoose.Schema<IArchivo>({
    archivo: {
        type: String, // Podría ser Buffer para BinData, pero base64 es común para pequeños archivos
        required: [true, 'El contenido del archivo es obligatorio']
    },
    idEntidad: {
        type: String, // Almacena el ObjectId de la entidad asociada como String
        required: [true, 'El ID de la entidad asociada es obligatorio']
    },
    idEntidadAsociada: {
        type: Schema.Types.ObjectId,
        ref: 'EntidadAsociada',
        required: [true, 'El tipo de entidad asociada es obligatorio']
    },
    idTipoArchivo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoArchivos',
        required: [true, 'El tipo de archivo es obligatorio']
    },
    nombreArchivo: {
        type: String,
        required: false // Puede ser inferido o no siempre necesario
    },
    mimeType: {
        type: String,
        required: false // Puede ser inferido o no siempre necesario
    }
});

archivoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc: any, ret: Record<string, any>, options: Record<string, any>) {
        delete ret._id;
    },
});

export const ArchivosModel = mongoose.model<IArchivo>('Archivos', archivoSchema, 'archivos');