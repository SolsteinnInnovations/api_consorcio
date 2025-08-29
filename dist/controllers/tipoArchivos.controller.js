"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarTipoArchivo = exports.actualizarTipoArchivo = exports.getTipoArchivoById = exports.getTiposArchivos = exports.crearTipoArchivo = void 0;
const tipoArchivos_model_1 = require("../models/tipoArchivos.model");
const edificios_model_1 = require("../models/edificios.model");
const crearTipoArchivo = async (req, res) => {
    const { descripcion, idEdificio } = req.body;
    try {
        const existeTipoArchivo = await tipoArchivos_model_1.TipoArchivosModel.findOne({ descripcion });
        if (existeTipoArchivo) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un tipo de archivo con esa descripción.'
            });
        }
        if (idEdificio) {
            const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
        }
        // Fin de validación habilitada
        const tipoArchivo = new tipoArchivos_model_1.TipoArchivosModel(req.body);
        await tipoArchivo.save();
        res.status(201).json({
            ok: true,
            msg: 'Tipo de archivo creado exitosamente',
            tipoArchivo
        });
    }
    catch (error) { // Se añade ': any' para tipar el error y acceder a 'error.message'
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el tipo de archivo.'
        });
    }
};
exports.crearTipoArchivo = crearTipoArchivo;
const getTiposArchivos = async (req, res) => {
    try {
        const tiposArchivos = await tipoArchivos_model_1.TipoArchivosModel.find()
            .populate('idEdificio', 'identificadorEdificio direccion');
        res.status(200).json({
            ok: true,
            tiposArchivos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los tipos de archivos.'
        });
    }
};
exports.getTiposArchivos = getTiposArchivos;
const getTipoArchivoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoArchivo = await tipoArchivos_model_1.TipoArchivosModel.findById(id)
            .populate('idEdificio', 'identificadorEdificio direccion');
        if (!tipoArchivo) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de archivo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            tipoArchivo
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el tipo de archivo.'
        });
    }
};
exports.getTipoArchivoById = getTipoArchivoById;
const actualizarTipoArchivo = async (req, res) => {
    const id = req.params.id;
    const { descripcion, idEdificio, ...campos } = req.body;
    try {
        const tipoArchivoDB = await tipoArchivos_model_1.TipoArchivosModel.findById(id);
        if (!tipoArchivoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de archivo no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== tipoArchivoDB.descripcion) {
            const existeDescripcion = await tipoArchivos_model_1.TipoArchivosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un tipo de archivo con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        if (idEdificio !== undefined && String(idEdificio) !== String(tipoArchivoDB.idEdificio)) { // Permite setting a null
            if (idEdificio) {
                const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
                if (!existeEdificio) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de edificio proporcionado no existe.'
                    });
                }
            }
            campos.idEdificio = idEdificio;
        }
        // Fin de validación habilitada
        const tipoArchivoActualizado = await tipoArchivos_model_1.TipoArchivosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Tipo de archivo actualizado exitosamente',
            tipoArchivo: tipoArchivoActualizado
        });
    }
    catch (error) { // Se añade ': any' para tipar el error y acceder a 'error.message'
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el tipo de archivo.'
        });
    }
};
exports.actualizarTipoArchivo = actualizarTipoArchivo;
const eliminarTipoArchivo = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoArchivoBorrado = await tipoArchivos_model_1.TipoArchivosModel.findByIdAndDelete(id);
        if (!tipoArchivoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de archivo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Tipo de archivo eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el tipo de archivo.'
        });
    }
};
exports.eliminarTipoArchivo = eliminarTipoArchivo;
//# sourceMappingURL=tipoArchivos.controller.js.map