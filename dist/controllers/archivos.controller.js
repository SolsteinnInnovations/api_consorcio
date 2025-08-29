"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarArchivo = exports.actualizarArchivo = exports.getArchivoById = exports.getArchivos = exports.crearArchivo = void 0;
const archivos_model_1 = require("../models/archivos.model");
const entidadAsociada_model_1 = require("../models/entidadAsociada.model");
const tipoArchivos_model_1 = require("../models/tipoArchivos.model");
const reclamos_model_1 = require("../models/reclamos.model");
const personas_model_1 = require("../models/personas.model");
const edificios_model_1 = require("../models/edificios.model");
const crearArchivo = async (req, res) => {
    const { idEntidad, idEntidadAsociada, idTipoArchivo } = req.body;
    try {
        const existeEntidadAsociada = await entidadAsociada_model_1.EntidadAsociadaModel.findById(idEntidadAsociada);
        if (!existeEntidadAsociada) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de entidad asociada proporcionado no existe.'
            });
        }
        const existeTipoArchivo = await tipoArchivos_model_1.TipoArchivosModel.findById(idTipoArchivo);
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
        const modelMap = {
            'reclamo': reclamos_model_1.ReclamosModel,
            'persona': personas_model_1.PersonasModel,
            'edificio': edificios_model_1.EdificiosModel,
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
        const archivo = new archivos_model_1.ArchivosModel(req.body);
        await archivo.save();
        res.status(201).json({
            ok: true,
            msg: 'Archivo creado exitosamente',
            archivo
        });
    }
    catch (error) { // Se añade ': any' para tipar el error
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
exports.crearArchivo = crearArchivo;
const getArchivos = async (req, res) => {
    try {
        const archivos = await archivos_model_1.ArchivosModel.find()
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los archivos.'
        });
    }
};
exports.getArchivos = getArchivos;
const getArchivoById = async (req, res) => {
    const id = req.params.id;
    try {
        const archivo = await archivos_model_1.ArchivosModel.findById(id)
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el archivo.'
        });
    }
};
exports.getArchivoById = getArchivoById;
const actualizarArchivo = async (req, res) => {
    const id = req.params.id;
    // No permitir cambiar idEntidad o idEntidadAsociada para mantener la integridad del archivo.
    const { idEntidad, idEntidadAsociada, idTipoArchivo, ...campos } = req.body;
    try {
        const archivoDB = await archivos_model_1.ArchivosModel.findById(id);
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
            const existeTipoArchivo = await tipoArchivos_model_1.TipoArchivosModel.findById(idTipoArchivo);
            if (!existeTipoArchivo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de tipo de archivo proporcionado no existe.'
                });
            }
            campos.idTipoArchivo = idTipoArchivo;
        }
        const archivoActualizado = await archivos_model_1.ArchivosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Archivo actualizado exitosamente',
            archivo: archivoActualizado
        });
    }
    catch (error) { // Se añade ': any' para tipar el error
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
exports.actualizarArchivo = actualizarArchivo;
const eliminarArchivo = async (req, res) => {
    const id = req.params.id;
    try {
        const archivoBorrado = await archivos_model_1.ArchivosModel.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el archivo.'
        });
    }
};
exports.eliminarArchivo = eliminarArchivo;
//# sourceMappingURL=archivos.controller.js.map