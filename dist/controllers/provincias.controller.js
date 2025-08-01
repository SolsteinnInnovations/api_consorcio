"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProvincia = exports.actualizarProvincia = exports.getProvinciaById = exports.getProvincias = exports.crearProvincia = void 0;
const provincias_model_1 = require("../models/provincias.model");
const paises_model_1 = require("../models/paises.model"); // Para validar idPais
const crearProvincia = async (req, res) => {
    const { descripcion, idPais } = req.body;
    try {
        const existeProvincia = await provincias_model_1.ProvinciasModel.findOne({ descripcion });
        if (existeProvincia) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una provincia con esa descripción.'
            });
        }
        const existePais = await paises_model_1.PaisesModel.findById(idPais);
        if (!existePais) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de país proporcionado no existe.'
            });
        }
        const provincia = new provincias_model_1.ProvinciasModel(req.body);
        await provincia.save();
        res.status(201).json({
            ok: true,
            msg: 'Provincia creada exitosamente',
            provincia
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la provincia.'
        });
    }
};
exports.crearProvincia = crearProvincia;
const getProvincias = async (req, res) => {
    try {
        const provincias = await provincias_model_1.ProvinciasModel.find().populate('idPais', 'descripcion');
        res.status(200).json({
            ok: true,
            provincias
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las provincias.'
        });
    }
};
exports.getProvincias = getProvincias;
const getProvinciaById = async (req, res) => {
    const id = req.params.id;
    try {
        const provincia = await provincias_model_1.ProvinciasModel.findById(id).populate('idPais', 'descripcion');
        if (!provincia) {
            return res.status(404).json({
                ok: false,
                msg: 'Provincia no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            provincia
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la provincia.'
        });
    }
};
exports.getProvinciaById = getProvinciaById;
const actualizarProvincia = async (req, res) => {
    const id = req.params.id;
    const { descripcion, idPais, ...campos } = req.body;
    try {
        const provinciaDB = await provincias_model_1.ProvinciasModel.findById(id);
        if (!provinciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Provincia no encontrada por ID.'
            });
        }
        if (descripcion && descripcion !== provinciaDB.descripcion) {
            const existeDescripcion = await provincias_model_1.ProvinciasModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una provincia con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        if (idPais && String(idPais) !== String(provinciaDB.idPais)) {
            const existePais = await paises_model_1.PaisesModel.findById(idPais);
            if (!existePais) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de país proporcionado no existe.'
                });
            }
            campos.idPais = idPais;
        }
        const provinciaActualizada = await provincias_model_1.ProvinciasModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Provincia actualizada exitosamente',
            provincia: provinciaActualizada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la provincia.'
        });
    }
};
exports.actualizarProvincia = actualizarProvincia;
const eliminarProvincia = async (req, res) => {
    const id = req.params.id;
    try {
        // La eliminación de provincias podría necesitar lógica para evitar eliminar provincias con localidades asociadas.
        // Por ahora, implementamos eliminación física simple.
        const provinciaBorrada = await provincias_model_1.ProvinciasModel.findByIdAndDelete(id);
        if (!provinciaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Provincia no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Provincia eliminada exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la provincia.'
        });
    }
};
exports.eliminarProvincia = eliminarProvincia;
