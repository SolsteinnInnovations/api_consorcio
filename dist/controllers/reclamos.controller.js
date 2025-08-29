"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarReclamo = exports.actualizarReclamo = exports.getReclamoById = exports.getReclamos = exports.crearReclamo = void 0;
const reclamos_model_1 = require("../models/reclamos.model");
const cajaMovimientos_model_1 = require("../models/cajaMovimientos.model");
const crearReclamo = async (req, res) => {
    const { identificacion, idCajaMovimiento, fechaInicio, fechaFin } = req.body;
    try {
        const existeReclamo = await reclamos_model_1.ReclamosModel.findOne({ identificacion });
        if (existeReclamo) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un reclamo con esa identificación.'
            });
        }
        if (idCajaMovimiento) {
            const existeCajaMovimiento = await cajaMovimientos_model_1.CajaMovimientosModel.findById(idCajaMovimiento);
            if (!existeCajaMovimiento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de movimiento de caja proporcionado no existe.'
                });
            }
        }
        if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de inicio no puede ser posterior a la fecha de fin.'
            });
        }
        const reclamo = new reclamos_model_1.ReclamosModel(req.body);
        await reclamo.save();
        res.status(201).json({
            ok: true,
            msg: 'Reclamo creado exitosamente',
            reclamo
        });
    }
    catch (error) { // Añadido : any para tipar el error
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el reclamo.'
        });
    }
};
exports.crearReclamo = crearReclamo;
const getReclamos = async (req, res) => {
    try {
        const reclamos = await reclamos_model_1.ReclamosModel.find()
            .populate('idCajaMovimiento', 'descripcion ingreso egreso fechaMovimiento');
        res.status(200).json({
            ok: true,
            reclamos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los reclamos.'
        });
    }
};
exports.getReclamos = getReclamos;
const getReclamoById = async (req, res) => {
    const id = req.params.id;
    try {
        const reclamo = await reclamos_model_1.ReclamosModel.findById(id)
            .populate('idCajaMovimiento', 'descripcion ingreso egreso fechaMovimiento');
        if (!reclamo) {
            return res.status(404).json({
                ok: false,
                msg: 'Reclamo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            reclamo
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el reclamo.'
        });
    }
};
exports.getReclamoById = getReclamoById;
const actualizarReclamo = async (req, res) => {
    const id = req.params.id;
    const { identificacion, idCajaMovimiento, fechaInicio, fechaFin, ...campos } = req.body;
    try {
        const reclamoDB = await reclamos_model_1.ReclamosModel.findById(id);
        if (!reclamoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Reclamo no encontrado por ID.'
            });
        }
        if (identificacion && identificacion !== reclamoDB.identificacion) {
            const existeIdentificacion = await reclamos_model_1.ReclamosModel.findOne({ identificacion });
            if (existeIdentificacion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un reclamo con esa identificación.'
                });
            }
            campos.identificacion = identificacion;
        }
        if (idCajaMovimiento !== undefined && String(idCajaMovimiento) !== String(reclamoDB.idCajaMovimiento)) { // Permite setting a null
            if (idCajaMovimiento) {
                const existeCajaMovimiento = await cajaMovimientos_model_1.CajaMovimientosModel.findById(idCajaMovimiento);
                if (!existeCajaMovimiento) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de movimiento de caja proporcionado no existe.'
                    });
                }
            }
            campos.idCajaMovimiento = idCajaMovimiento;
        }
        // Validar fechas al actualizar
        const fechaInicioActual = fechaInicio ? new Date(fechaInicio) : reclamoDB.fechaInicio;
        const fechaFinActual = fechaFin ? new Date(fechaFin) : reclamoDB.fechaFin;
        if (fechaInicioActual && fechaFinActual && fechaInicioActual > fechaFinActual) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de inicio no puede ser posterior a la fecha de fin.'
            });
        }
        if (fechaInicio)
            campos.fechaInicio = fechaInicio;
        if (fechaFin)
            campos.fechaFin = fechaFin;
        const reclamoActualizado = await reclamos_model_1.ReclamosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Reclamo actualizado exitosamente',
            reclamo: reclamoActualizado
        });
    }
    catch (error) { // Añadido : any para tipar el error
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el reclamo.'
        });
    }
};
exports.actualizarReclamo = actualizarReclamo;
const eliminarReclamo = async (req, res) => {
    const id = req.params.id;
    try {
        const reclamoBorrado = await reclamos_model_1.ReclamosModel.findByIdAndDelete(id);
        if (!reclamoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Reclamo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Reclamo eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el reclamo.'
        });
    }
};
exports.eliminarReclamo = eliminarReclamo;
//# sourceMappingURL=reclamos.controller.js.map