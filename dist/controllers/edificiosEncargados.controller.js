"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEdificioEncargado = exports.getEdificioEncargadoById = exports.getEdificiosEncargados = exports.crearEdificioEncargado = void 0;
const edificiosEncargados_model_1 = require("../models/edificiosEncargados.model");
const personas_model_1 = require("../models/personas.model");
const edificios_model_1 = require("../models/edificios.model");
const crearEdificioEncargado = async (req, res) => {
    const { idPersona, idEdificio } = req.body;
    try {
        const existePersona = await personas_model_1.PersonasModel.findById(idPersona);
        if (!existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de persona proporcionado no existe.'
            });
        }
        if (!existePersona.encargado) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona debe tener el campo "encargado" en true para ser asignada como encargada de un edificio.'
            });
        }
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        const existeRelacion = await edificiosEncargados_model_1.EdificiosEncargadosModel.findOne({ idPersona, idEdificio });
        if (existeRelacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta persona ya es encargada de este edificio.'
            });
        }
        const edificioEncargado = new edificiosEncargados_model_1.EdificiosEncargadosModel(req.body);
        await edificioEncargado.save();
        res.status(201).json({
            ok: true,
            msg: 'Relación edificio-encargado creada exitosamente',
            edificioEncargado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la relación edificio-encargado.'
        });
    }
};
exports.crearEdificioEncargado = crearEdificioEncargado;
const getEdificiosEncargados = async (req, res) => {
    try {
        const edificiosEncargados = await edificiosEncargados_model_1.EdificiosEncargadosModel.find()
            .populate('idPersona', 'nombres apellidos documento') // Muestra los nombres, apellidos y documento del encargado
            .populate('idEdificio', 'direccion identificadorEdificio'); // Muestra la dirección e identificador del edificio
        res.status(200).json({
            ok: true,
            edificiosEncargados
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las relaciones edificio-encargado.'
        });
    }
};
exports.getEdificiosEncargados = getEdificiosEncargados;
const getEdificioEncargadoById = async (req, res) => {
    const id = req.params.id;
    try {
        const edificioEncargado = await edificiosEncargados_model_1.EdificiosEncargadosModel.findById(id)
            .populate('idPersona', 'nombres apellidos documento')
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!edificioEncargado) {
            return res.status(404).json({
                ok: false,
                msg: 'Relación edificio-encargado no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            edificioEncargado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la relación edificio-encargado.'
        });
    }
};
exports.getEdificioEncargadoById = getEdificioEncargadoById;
const eliminarEdificioEncargado = async (req, res) => {
    const id = req.params.id;
    try {
        const edificioEncargadoBorrado = await edificiosEncargados_model_1.EdificiosEncargadosModel.findByIdAndDelete(id);
        if (!edificioEncargadoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Relación edificio-encargado no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Relación edificio-encargado eliminada exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la relación edificio-encargado.'
        });
    }
};
exports.eliminarEdificioEncargado = eliminarEdificioEncargado;
//# sourceMappingURL=edificiosEncargados.controller.js.map