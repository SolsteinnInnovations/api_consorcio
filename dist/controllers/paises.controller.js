"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPais = exports.actualizarPais = exports.getPaisById = exports.getPaises = exports.crearPais = void 0;
const paises_model_1 = require("../models/paises.model");
const crearPais = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const existePais = await paises_model_1.PaisesModel.findOne({ descripcion });
        if (existePais) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un país con esa descripción.'
            });
        }
        const pais = new paises_model_1.PaisesModel(req.body);
        await pais.save();
        res.status(201).json({
            ok: true,
            msg: 'País creado exitosamente',
            pais
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el país.'
        });
    }
};
exports.crearPais = crearPais;
const getPaises = async (req, res) => {
    try {
        const paises = await paises_model_1.PaisesModel.find();
        res.status(200).json({
            ok: true,
            paises
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los países.'
        });
    }
};
exports.getPaises = getPaises;
const getPaisById = async (req, res) => {
    const id = req.params.id;
    try {
        const pais = await paises_model_1.PaisesModel.findById(id);
        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: 'País no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            pais
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el país.'
        });
    }
};
exports.getPaisById = getPaisById;
const actualizarPais = async (req, res) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const paisDB = await paises_model_1.PaisesModel.findById(id);
        if (!paisDB) {
            return res.status(404).json({
                ok: false,
                msg: 'País no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== paisDB.descripcion) {
            const existeDescripcion = await paises_model_1.PaisesModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un país con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const paisActualizado = await paises_model_1.PaisesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'País actualizado exitosamente',
            pais: paisActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el país.'
        });
    }
};
exports.actualizarPais = actualizarPais;
const eliminarPais = async (req, res) => {
    const id = req.params.id;
    try {
        // La eliminación de países podría necesitar lógica para evitar eliminar países con provincias asociadas.
        // Por ahora, implementamos eliminación física simple.
        const paisBorrado = await paises_model_1.PaisesModel.findByIdAndDelete(id);
        if (!paisBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'País no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'País eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el país.'
        });
    }
};
exports.eliminarPais = eliminarPais;
