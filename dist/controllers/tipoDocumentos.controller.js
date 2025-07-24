"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarTipoDocumento = exports.actualizarTipoDocumento = exports.getTipoDocumentoById = exports.getTiposDocumentos = exports.crearTipoDocumento = void 0;
const tipoDocumentos_model_1 = require("../models/tipoDocumentos.model");
const crearTipoDocumento = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const existeTipoDocumento = await tipoDocumentos_model_1.TipoDocumentosModel.findOne({ descripcion });
        if (existeTipoDocumento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un tipo de documento con esa descripción.'
            });
        }
        const tipoDocumento = new tipoDocumentos_model_1.TipoDocumentosModel(req.body);
        await tipoDocumento.save();
        res.status(201).json({
            ok: true,
            msg: 'Tipo de documento creado exitosamente',
            tipoDocumento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el tipo de documento.'
        });
    }
};
exports.crearTipoDocumento = crearTipoDocumento;
const getTiposDocumentos = async (req, res) => {
    try {
        const tiposDocumentos = await tipoDocumentos_model_1.TipoDocumentosModel.find();
        res.status(200).json({
            ok: true,
            tiposDocumentos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los tipos de documentos.'
        });
    }
};
exports.getTiposDocumentos = getTiposDocumentos;
const getTipoDocumentoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoDocumento = await tipoDocumentos_model_1.TipoDocumentosModel.findById(id);
        if (!tipoDocumento) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de documento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            tipoDocumento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el tipo de documento.'
        });
    }
};
exports.getTipoDocumentoById = getTipoDocumentoById;
const actualizarTipoDocumento = async (req, res) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const tipoDocumentoDB = await tipoDocumentos_model_1.TipoDocumentosModel.findById(id);
        if (!tipoDocumentoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de documento no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== tipoDocumentoDB.descripcion) {
            const existeDescripcion = await tipoDocumentos_model_1.TipoDocumentosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un tipo de documento con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const tipoDocumentoActualizado = await tipoDocumentos_model_1.TipoDocumentosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Tipo de documento actualizado exitosamente',
            tipoDocumento: tipoDocumentoActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el tipo de documento.'
        });
    }
};
exports.actualizarTipoDocumento = actualizarTipoDocumento;
const eliminarTipoDocumento = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoDocumentoBorrado = await tipoDocumentos_model_1.TipoDocumentosModel.findByIdAndDelete(id);
        if (!tipoDocumentoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de documento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Tipo de documento eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el tipo de documento.'
        });
    }
};
exports.eliminarTipoDocumento = eliminarTipoDocumento;
