"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarParametroConfiguracion = exports.actualizarParametroConfiguracion = exports.getParametroConfiguracionById = exports.getParametrosConfiguracion = exports.crearParametroConfiguracion = void 0;
// Actualiza la importación del modelo
const parametrosConfiguraciones_model_1 = require("../models/parametrosConfiguraciones.model");
// --- Crear un nuevo ParametroConfiguracion ---
const crearParametroConfiguracion = async (req, res) => {
    const { nombre } = req.body;
    try {
        const existeParametro = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.findOne({ nombre }); // Usa ParametrosConfiguracionesModel
        if (existeParametro) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un parámetro con ese nombre.'
            });
        }
        const parametro = new parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel(req.body); // Usa ParametrosConfiguracionesModel
        await parametro.save();
        res.status(201).json({
            ok: true,
            msg: 'Parámetro de configuración creado exitosamente',
            parametro
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el parámetro de configuración.'
        });
    }
};
exports.crearParametroConfiguracion = crearParametroConfiguracion;
// --- Obtener todos los ParametrosConfiguracion ---
const getParametrosConfiguracion = async (req, res) => {
    try {
        const parametros = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.find(); // Usa ParametrosConfiguracionesModel
        res.status(200).json({
            ok: true,
            parametros
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los parámetros de configuración.'
        });
    }
};
exports.getParametrosConfiguracion = getParametrosConfiguracion;
// --- Obtener un ParametroConfiguracion por ID ---
const getParametroConfiguracionById = async (req, res) => {
    const id = req.params.id;
    try {
        const parametro = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.findById(id); // Usa ParametrosConfiguracionesModel
        if (!parametro) {
            return res.status(404).json({
                ok: false,
                msg: 'Parámetro de configuración no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            parametro
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el parámetro de configuración.'
        });
    }
};
exports.getParametroConfiguracionById = getParametroConfiguracionById;
// --- Actualizar un ParametroConfiguracion ---
const actualizarParametroConfiguracion = async (req, res) => {
    const id = req.params.id;
    const { nombre, ...campos } = req.body;
    try {
        const parametroDB = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.findById(id); // Usa ParametrosConfiguracionesModel
        if (!parametroDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Parámetro de configuración no encontrado por ID.'
            });
        }
        if (nombre && nombre !== parametroDB.nombre) {
            const existeNombre = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.findOne({ nombre }); // Usa ParametrosConfiguracionesModel
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un parámetro con ese nombre.'
                });
            }
            campos.nombre = nombre;
        }
        const parametroActualizado = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.findByIdAndUpdate(id, campos, { new: true }); // Usa ParametrosConfiguracionesModel
        res.status(200).json({
            ok: true,
            msg: 'Parámetro de configuración actualizado exitosamente',
            parametro: parametroActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el parámetro de configuración.'
        });
    }
};
exports.actualizarParametroConfiguracion = actualizarParametroConfiguracion;
// --- Eliminar un ParametroConfiguracion (físico o lógico, aquí físico por simplicidad) ---
const eliminarParametroConfiguracion = async (req, res) => {
    const id = req.params.id;
    try {
        const parametroBorrado = await parametrosConfiguraciones_model_1.ParametrosConfiguracionesModel.findByIdAndDelete(id); // Usa ParametrosConfiguracionesModel
        if (!parametroBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Parámetro de configuración no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Parámetro de configuración eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el parámetro de configuración.'
        });
    }
};
exports.eliminarParametroConfiguracion = eliminarParametroConfiguracion;
