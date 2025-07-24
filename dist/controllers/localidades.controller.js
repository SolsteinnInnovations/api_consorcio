"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarLocalidad = exports.actualizarLocalidad = exports.getLocalidadById = exports.getLocalidades = exports.crearLocalidad = void 0;
const localidades_model_1 = require("../models/localidades.model");
const provincias_model_1 = require("../models/provincias.model"); // Para validar idProvincia
const crearLocalidad = async (req, res) => {
    const { descripcion, codigoPostal, idProvincia } = req.body;
    try {
        const existeLocalidad = await localidades_model_1.LocalidadesModel.findOne({ descripcion });
        if (existeLocalidad) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una localidad con esa descripción.'
            });
        }
        const existeProvincia = await provincias_model_1.ProvinciasModel.findById(idProvincia);
        if (!existeProvincia) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de provincia proporcionado no existe.'
            });
        }
        const localidad = new localidades_model_1.LocalidadesModel(req.body);
        await localidad.save();
        res.status(201).json({
            ok: true,
            msg: 'Localidad creada exitosamente',
            localidad
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la localidad.'
        });
    }
};
exports.crearLocalidad = crearLocalidad;
const getLocalidades = async (req, res) => {
    try {
        const localidades = await localidades_model_1.LocalidadesModel.find().populate('idProvincia', 'descripcion').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'descripcion'
            }
        });
        res.status(200).json({
            ok: true,
            localidades
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las localidades.'
        });
    }
};
exports.getLocalidades = getLocalidades;
const getLocalidadById = async (req, res) => {
    const id = req.params.id;
    try {
        const localidad = await localidades_model_1.LocalidadesModel.findById(id).populate('idProvincia', 'descripcion').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'descripcion'
            }
        });
        if (!localidad) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            localidad
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la localidad.'
        });
    }
};
exports.getLocalidadById = getLocalidadById;
const actualizarLocalidad = async (req, res) => {
    const id = req.params.id;
    const { descripcion, idProvincia, ...campos } = req.body;
    try {
        const localidadDB = await localidades_model_1.LocalidadesModel.findById(id);
        if (!localidadDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }
        if (descripcion && descripcion !== localidadDB.descripcion) {
            const existeDescripcion = await localidades_model_1.LocalidadesModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una localidad con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        if (idProvincia && String(idProvincia) !== String(localidadDB.idProvincia)) {
            const existeProvincia = await provincias_model_1.ProvinciasModel.findById(idProvincia);
            if (!existeProvincia) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de provincia proporcionado no existe.'
                });
            }
            campos.idProvincia = idProvincia;
        }
        const localidadActualizada = await localidades_model_1.LocalidadesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Localidad actualizada exitosamente',
            localidad: localidadActualizada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la localidad.'
        });
    }
};
exports.actualizarLocalidad = actualizarLocalidad;
const eliminarLocalidad = async (req, res) => {
    const id = req.params.id;
    try {
        const localidadBorrada = await localidades_model_1.LocalidadesModel.findByIdAndDelete(id);
        if (!localidadBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Localidad eliminada exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la localidad.'
        });
    }
};
exports.eliminarLocalidad = eliminarLocalidad;
