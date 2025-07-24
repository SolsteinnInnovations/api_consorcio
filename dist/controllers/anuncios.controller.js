"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarAnuncio = exports.actualizarAnuncio = exports.getAnuncioById = exports.getAnuncios = exports.crearAnuncio = void 0;
const anuncios_model_1 = require("../models/anuncios.model");
const edificios_model_1 = require("../models/edificios.model");
const crearAnuncio = async (req, res) => {
    const { identificacion, idEdificio } = req.body;
    try {
        const existeAnuncio = await anuncios_model_1.AnunciosModel.findOne({ identificacion });
        if (existeAnuncio) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un anuncio con esa identificación.'
            });
        }
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        const anuncio = new anuncios_model_1.AnunciosModel(req.body);
        await anuncio.save();
        res.status(201).json({
            ok: true,
            msg: 'Anuncio creado exitosamente',
            anuncio
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el anuncio.'
        });
    }
};
exports.crearAnuncio = crearAnuncio;
const getAnuncios = async (req, res) => {
    try {
        const anuncios = await anuncios_model_1.AnunciosModel.find()
            .populate('idEdificio', 'direccion identificadorEdificio');
        res.status(200).json({
            ok: true,
            anuncios
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los anuncios.'
        });
    }
};
exports.getAnuncios = getAnuncios;
const getAnuncioById = async (req, res) => {
    const id = req.params.id;
    try {
        const anuncio = await anuncios_model_1.AnunciosModel.findById(id)
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!anuncio) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            anuncio
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el anuncio.'
        });
    }
};
exports.getAnuncioById = getAnuncioById;
const actualizarAnuncio = async (req, res) => {
    const id = req.params.id;
    const { identificacion, idEdificio, ...campos } = req.body;
    try {
        const anuncioDB = await anuncios_model_1.AnunciosModel.findById(id);
        if (!anuncioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no encontrado por ID.'
            });
        }
        if (identificacion && identificacion !== anuncioDB.identificacion) {
            const existeIdentificacion = await anuncios_model_1.AnunciosModel.findOne({ identificacion });
            if (existeIdentificacion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un anuncio con esa identificación.'
                });
            }
            campos.identificacion = identificacion;
        }
        if (idEdificio && String(idEdificio) !== String(anuncioDB.idEdificio)) {
            const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
            campos.idEdificio = idEdificio;
        }
        const anuncioActualizado = await anuncios_model_1.AnunciosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Anuncio actualizado exitosamente',
            anuncio: anuncioActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el anuncio.'
        });
    }
};
exports.actualizarAnuncio = actualizarAnuncio;
const eliminarAnuncio = async (req, res) => {
    const id = req.params.id;
    try {
        const anuncioBorrado = await anuncios_model_1.AnunciosModel.findByIdAndDelete(id);
        if (!anuncioBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Anuncio eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el anuncio.'
        });
    }
};
exports.eliminarAnuncio = eliminarAnuncio;
