"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearLocalidadBulk = exports.eliminarLocalidad = exports.actualizarLocalidad = exports.getLocalidadById = exports.getLocalidades = exports.crearLocalidad = void 0;
const localidades_model_1 = require("../models/localidades.model");
const provincias_model_1 = require("../models/provincias.model"); // Para validar idProvincia
const LocalidadService_1 = require("../services/LocalidadService");
const crearLocalidadBulk = async (req, res) => {
    try {
        await localidades_model_1.LocalidadesModel.syncIndexes();
        await (0, LocalidadService_1.localidadBulk)();
        res.status(201).json({
            ok: true,
            msg: 'Localidades creadas exitosamente',
        });
    }
    catch (error) {
        console.error("Error al insertar localidades:", error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la localidad.'
        });
    }
};
exports.crearLocalidadBulk = crearLocalidadBulk;
const crearLocalidad = async (req, res) => {
    const { nombre, codigoPostal, idProvincia } = req.body;
    try {
        if (!nombre || !codigoPostal || !idProvincia) {
            return res.status(400).json({
                ok: false,
                msg: 'Los campos nombre, código postal e idProvincia son obligatorios.'
            });
        }
        if (isNaN(+codigoPostal)) {
            return res.status(400).json({
                ok: false,
                msg: 'El código postal debe ser un número.'
            });
        }
        const existeLocalidad = await localidades_model_1.LocalidadesModel.findOne({ nombre });
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
        localidad.nombre = nombre.toUpperCase(); // Asegura que el nombre esté en mayúsculas
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
        const localidades = await localidades_model_1.LocalidadesModel.find().populate('idProvincia', 'nombre').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'nombre'
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
        const localidad = await localidades_model_1.LocalidadesModel.findById(id).populate('idProvincia', 'nombre').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'nombre'
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
    const { nombre, idProvincia, ...campos } = req.body;
    try {
        const localidadDB = await localidades_model_1.LocalidadesModel.findById(id);
        if (!localidadDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }
        if (nombre && nombre !== localidadDB.nombre) {
            const existeDescripcion = await localidades_model_1.LocalidadesModel.findOne({ nombre });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una localidad con esa descripción.'
                });
            }
            campos.nombre = nombre;
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
//# sourceMappingURL=localidades.controller.js.map