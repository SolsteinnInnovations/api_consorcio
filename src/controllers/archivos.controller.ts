import { Request, Response } from 'express';
import { ArchivosModel, IArchivo } from '../models/archivos.model';
import { EntidadAsociadaModel } from '../models/entidadAsociada.model';
import { TipoArchivosModel } from '../models/tipoArchivos.model';

import { ReclamosModel } from '../models/reclamos.model';
import { PersonasModel } from '../models/personas.model';
import { EdificiosModel } from '../models/edificios.model';

const crearArchivo = async (req: Request, res: Response) => {
    const { idEntidad, idEntidadAsociada, idTipoArchivo } = req.body;
    try {
        const existeEntidadAsociada = await EntidadAsociadaModel.findById(idEntidadAsociada);
        if (!existeEntidadAsociada) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de entidad asociada proporcionado no existe.'
            });
        }

        const existeTipoArchivo = await TipoArchivosModel.findById(idTipoArchivo);
        if (!existeTipoArchivo) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de tipo de archivo proporcionado no existe.'
            });
        }

        // --- Validación de idEntidad contra el modelo real (Polimórfica) ---
        // Se utiliza un mapeo de 'descripcion' de EntidadAsociada a los modelos de Mongoose.
        const entidadType = existeEntidadAsociada.descripcion; // Ej: "Reclamo", "Persona", "Edificio"

        // Objeto de mapeo de nombres de entidad a Modelos de Mongoose
        const modelMap: { [key: string]: any } = {
            'reclamo': ReclamosModel,
            'persona': PersonasModel,
            'edificio': EdificiosModel,

        };

        const targetModel = modelMap[entidadType.toLowerCase()];

        if (!targetModel) {
            return res.status(400).json({
                ok: false,
                msg: `Tipo de entidad asociada '${entidadType}' no reconocido para validación.`
            });
        }

        const existeEntidadReal = await targetModel.findById(idEntidad);
        if (!existeEntidadReal) {
            return res.status(400).json({
                ok: false,
                msg: `El ID de entidad '${idEntidad}' no existe en la colección de ${entidadType}.`
            });
        }
        // --- Fin de la validación polimórfica ---

        const archivo = new ArchivosModel(req.body);
        await archivo.save();
        res.status(201).json({
            ok: true,
            msg: 'Archivo creado exitosamente',
            archivo
        });
    } catch (error: any) { // Se añade ': any' para tipar el error
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el archivo.'
        });
    }
};

const getArchivos = async (req: Request, res: Response) => {
    try {
        const archivos = await ArchivosModel.find()
            .populate('idEntidadAsociada', 'descripcion')
            .populate('idTipoArchivo', 'descripcion');
        // Nota: Para poblar 'idEntidad' de forma polimórfica y mostrar sus datos,
        // se requeriría una lógica adicional en el frontend o un 'populate' condicional
        // en el backend si el tipo de entidad es fijo, o un 'virtual populate' si se mapeó así en el modelo.
        // Actualmente, solo se valida la referencia en la creación/actualización.
        res.status(200).json({
            ok: true,
            archivos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los archivos.'
        });
    }
};

const getArchivoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const archivo = await ArchivosModel.findById(id)
            .populate('idEntidadAsociada', 'descripcion')
            .populate('idTipoArchivo', 'descripcion');
        // Mismo caso que getArchivos para el populate de idEntidad.

        if (!archivo) {
            return res.status(404).json({
                ok: false,
                msg: 'Archivo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            archivo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el archivo.'
        });
    }
};

const actualizarArchivo = async (req: Request, res: Response) => {
    const id = req.params.id;
    // No permitir cambiar idEntidad o idEntidadAsociada para mantener la integridad del archivo.
    const { idEntidad, idEntidadAsociada, idTipoArchivo, ...campos } = req.body;
    try {
        const archivoDB = await ArchivosModel.findById(id);
        if (!archivoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Archivo no encontrado por ID.'
            });
        }

        // Se mantiene la restricción: no se debería cambiar la entidad o el tipo de entidad asociada de un archivo existente.
        // Si se necesita reasignar, sería mejor eliminar y crear uno nuevo para evitar inconsistencias históricas.
        if (idEntidad !== undefined || idEntidadAsociada !== undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'No se permite cambiar la entidad asociada (idEntidadAsociada) o el ID de entidad (idEntidad) de un archivo existente.'
            });
        }

        if (idTipoArchivo && String(idTipoArchivo) !== String(archivoDB.idTipoArchivo)) {
            const existeTipoArchivo = await TipoArchivosModel.findById(idTipoArchivo);
            if (!existeTipoArchivo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de tipo de archivo proporcionado no existe.'
                });
            }
            campos.idTipoArchivo = idTipoArchivo;
        }

        const archivoActualizado = await ArchivosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Archivo actualizado exitosamente',
            archivo: archivoActualizado
        });
    } catch (error: any) { // Se añade ': any' para tipar el error
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el archivo.'
        });
    }
};

const eliminarArchivo = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const archivoBorrado = await ArchivosModel.findByIdAndDelete(id);
        if (!archivoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Archivo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Archivo eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el archivo.'
        });
    }
};

export {
    crearArchivo,
    getArchivos,
    getArchivoById,
    actualizarArchivo,
    eliminarArchivo
};