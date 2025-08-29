"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEdificio = exports.actualizarEdificio = exports.getEdificioById = exports.getEdificios = exports.crearEdificio = void 0;
const edificios_model_1 = require("../models/edificios.model");
const localidades_model_1 = require("../models/localidades.model");
const crearEdificio = async (req, res) => {
    const { identificadorEdificio, idLocalidad } = req.body;
    try {
        const existeEdificio = await edificios_model_1.EdificiosModel.findOne({ identificadorEdificio });
        if (existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un edificio con ese identificador.'
            });
        }
        const existeLocalidad = await localidades_model_1.LocalidadesModel.findById(idLocalidad);
        if (!existeLocalidad) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de localidad proporcionado no existe.'
            });
        }
        const edificio = new edificios_model_1.EdificiosModel(req.body);
        await edificio.save();
        res.status(201).json({
            ok: true,
            msg: 'Edificio creado exitosamente',
            edificio
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el edificio.'
        });
    }
};
exports.crearEdificio = crearEdificio;
const getEdificios = async (req, res) => {
    try {
        const edificios = await edificios_model_1.EdificiosModel.find().populate({
            path: 'idLocalidad',
            select: 'descripcion codigoPostal',
            populate: {
                path: 'idProvincia',
                select: 'descripcion',
                populate: {
                    path: 'idPais',
                    select: 'descripcion'
                }
            }
        });
        res.status(200).json({
            ok: true,
            edificios
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los edificios.'
        });
    }
};
exports.getEdificios = getEdificios;
const getEdificioById = async (req, res) => {
    const id = req.params.id;
    try {
        const edificio = await edificios_model_1.EdificiosModel.findById(id).populate({
            path: 'idLocalidad',
            select: 'descripcion codigoPostal',
            populate: {
                path: 'idProvincia',
                select: 'descripcion',
                populate: {
                    path: 'idPais',
                    select: 'descripcion'
                }
            }
        });
        if (!edificio) {
            return res.status(404).json({
                ok: false,
                msg: 'Edificio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            edificio
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el edificio.'
        });
    }
};
exports.getEdificioById = getEdificioById;
const actualizarEdificio = async (req, res) => {
    const id = req.params.id;
    const { identificadorEdificio, idLocalidad, ...campos } = req.body;
    try {
        const edificioDB = await edificios_model_1.EdificiosModel.findById(id);
        if (!edificioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Edificio no encontrado por ID.'
            });
        }
        if (identificadorEdificio && identificadorEdificio !== edificioDB.identificadorEdificio) {
            const existeIdentificador = await edificios_model_1.EdificiosModel.findOne({ identificadorEdificio });
            if (existeIdentificador) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un edificio con ese identificador.'
                });
            }
            campos.identificadorEdificio = identificadorEdificio;
        }
        if (idLocalidad && String(idLocalidad) !== String(edificioDB.idLocalidad)) {
            const existeLocalidad = await localidades_model_1.LocalidadesModel.findById(idLocalidad);
            if (!existeLocalidad) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de localidad proporcionado no existe.'
                });
            }
            campos.idLocalidad = idLocalidad;
        }
        const edificioActualizado = await edificios_model_1.EdificiosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Edificio actualizado exitosamente',
            edificio: edificioActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el edificio.'
        });
    }
};
exports.actualizarEdificio = actualizarEdificio;
const eliminarEdificio = async (req, res) => {
    const id = req.params.id;
    try {
        const edificioBorrado = await edificios_model_1.EdificiosModel.findByIdAndDelete(id);
        if (!edificioBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Edificio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Edificio eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el edificio.'
        });
    }
};
exports.eliminarEdificio = eliminarEdificio;
//# sourceMappingURL=edificios.controller.js.map