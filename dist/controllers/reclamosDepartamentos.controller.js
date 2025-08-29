"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarReclamoDepartamento = exports.getReclamoDepartamentoById = exports.getReclamosDepartamentos = exports.crearReclamoDepartamento = void 0;
const reclamosDepartamentos_model_1 = require("../models/reclamosDepartamentos.model");
const reclamos_model_1 = require("../models/reclamos.model");
const departamentos_model_1 = require("../models/departamentos.model");
const crearReclamoDepartamento = async (req, res) => {
    const { idReclamo, idDepartamento } = req.body;
    try {
        const existeReclamo = await reclamos_model_1.ReclamosModel.findById(idReclamo);
        if (!existeReclamo) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de reclamo proporcionado no existe.'
            });
        }
        const existeDepartamento = await departamentos_model_1.DepartamentosModel.findById(idDepartamento);
        if (!existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de departamento proporcionado no existe.'
            });
        }
        const existeRelacion = await reclamosDepartamentos_model_1.ReclamosDepartamentosModel.findOne({ idReclamo, idDepartamento });
        if (existeRelacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Este departamento ya está asociado a este reclamo.'
            });
        }
        const reclamoDepartamento = new reclamosDepartamentos_model_1.ReclamosDepartamentosModel(req.body);
        await reclamoDepartamento.save();
        res.status(201).json({
            ok: true,
            msg: 'Relación reclamo-departamento creada exitosamente',
            reclamoDepartamento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la relación reclamo-departamento.'
        });
    }
};
exports.crearReclamoDepartamento = crearReclamoDepartamento;
const getReclamosDepartamentos = async (req, res) => {
    try {
        const reclamosDepartamentos = await reclamosDepartamentos_model_1.ReclamosDepartamentosModel.find()
            .populate('idReclamo', 'identificacion titulo') // Muestra identificación y título del reclamo
            .populate('idDepartamento', 'identificacion piso idEdificio'); // Muestra identificación, piso del departamento
        res.status(200).json({
            ok: true,
            reclamosDepartamentos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las relaciones reclamo-departamento.'
        });
    }
};
exports.getReclamosDepartamentos = getReclamosDepartamentos;
const getReclamoDepartamentoById = async (req, res) => {
    const id = req.params.id;
    try {
        const reclamoDepartamento = await reclamosDepartamentos_model_1.ReclamosDepartamentosModel.findById(id)
            .populate('idReclamo', 'identificacion titulo')
            .populate('idDepartamento', 'identificacion piso idEdificio');
        if (!reclamoDepartamento) {
            return res.status(404).json({
                ok: false,
                msg: 'Relación reclamo-departamento no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            reclamoDepartamento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la relación reclamo-departamento.'
        });
    }
};
exports.getReclamoDepartamentoById = getReclamoDepartamentoById;
const eliminarReclamoDepartamento = async (req, res) => {
    const id = req.params.id;
    try {
        const reclamoDepartamentoBorrado = await reclamosDepartamentos_model_1.ReclamosDepartamentosModel.findByIdAndDelete(id);
        if (!reclamoDepartamentoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Relación reclamo-departamento no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Relación reclamo-departamento eliminada exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la relación reclamo-departamento.'
        });
    }
};
exports.eliminarReclamoDepartamento = eliminarReclamoDepartamento;
//# sourceMappingURL=reclamosDepartamentos.controller.js.map