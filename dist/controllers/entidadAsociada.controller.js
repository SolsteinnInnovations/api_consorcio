"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEntidadAsociada = exports.actualizarEntidadAsociada = exports.getEntidadAsociadaById = exports.getEntidadesAsociadas = exports.crearEntidadAsociada = void 0;
const entidadAsociada_model_1 = require("../models/entidadAsociada.model");
const crearEntidadAsociada = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const existeEntidadAsociada = await entidadAsociada_model_1.EntidadAsociadaModel.findOne({ descripcion });
        if (existeEntidadAsociada) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una entidad asociada con esa descripción.'
            });
        }
        const entidadAsociada = new entidadAsociada_model_1.EntidadAsociadaModel(req.body);
        await entidadAsociada.save();
        res.status(201).json({
            ok: true,
            msg: 'Entidad asociada creada exitosamente',
            entidadAsociada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la entidad asociada.'
        });
    }
};
exports.crearEntidadAsociada = crearEntidadAsociada;
const getEntidadesAsociadas = async (req, res) => {
    try {
        const entidadesAsociadas = await entidadAsociada_model_1.EntidadAsociadaModel.find();
        res.status(200).json({
            ok: true,
            entidadesAsociadas
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las entidades asociadas.'
        });
    }
};
exports.getEntidadesAsociadas = getEntidadesAsociadas;
const getEntidadAsociadaById = async (req, res) => {
    const id = req.params.id;
    try {
        const entidadAsociada = await entidadAsociada_model_1.EntidadAsociadaModel.findById(id);
        if (!entidadAsociada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entidad asociada no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            entidadAsociada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la entidad asociada.'
        });
    }
};
exports.getEntidadAsociadaById = getEntidadAsociadaById;
const actualizarEntidadAsociada = async (req, res) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const entidadAsociadaDB = await entidadAsociada_model_1.EntidadAsociadaModel.findById(id);
        if (!entidadAsociadaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Entidad asociada no encontrada por ID.'
            });
        }
        if (descripcion && descripcion !== entidadAsociadaDB.descripcion) {
            const existeDescripcion = await entidadAsociada_model_1.EntidadAsociadaModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una entidad asociada con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const entidadAsociadaActualizada = await entidadAsociada_model_1.EntidadAsociadaModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Entidad asociada actualizada exitosamente',
            entidadAsociada: entidadAsociadaActualizada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la entidad asociada.'
        });
    }
};
exports.actualizarEntidadAsociada = actualizarEntidadAsociada;
const eliminarEntidadAsociada = async (req, res) => {
    const id = req.params.id;
    try {
        const entidadAsociadaBorrada = await entidadAsociada_model_1.EntidadAsociadaModel.findByIdAndDelete(id);
        if (!entidadAsociadaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Entidad asociada no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Entidad asociada eliminada exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la entidad asociada.'
        });
    }
};
exports.eliminarEntidadAsociada = eliminarEntidadAsociada;
//# sourceMappingURL=entidadAsociada.controller.js.map