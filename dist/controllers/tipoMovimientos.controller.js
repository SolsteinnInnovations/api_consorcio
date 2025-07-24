"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarTipoMovimiento = exports.actualizarTipoMovimiento = exports.getTipoMovimientoById = exports.getTiposMovimientos = exports.crearTipoMovimiento = void 0;
const tipoMovimientos_model_1 = require("../models/tipoMovimientos.model");
const edificios_model_1 = require("../models/edificios.model");
const crearTipoMovimiento = async (req, res) => {
    const { descripcion, idEdificio } = req.body;
    try {
        const existeTipoMovimiento = await tipoMovimientos_model_1.TipoMovimientosModel.findOne({ descripcion });
        if (existeTipoMovimiento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un tipo de movimiento con esa descripción.'
            });
        }
        if (idEdificio) {
            const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
        }
        // Fin de validación habilitada
        const tipoMovimiento = new tipoMovimientos_model_1.TipoMovimientosModel(req.body);
        await tipoMovimiento.save();
        res.status(201).json({
            ok: true,
            msg: 'Tipo de movimiento creado exitosamente',
            tipoMovimiento
        });
    }
    catch (error) { // Añadido ': any' para tipar el error
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el tipo de movimiento.'
        });
    }
};
exports.crearTipoMovimiento = crearTipoMovimiento;
const getTiposMovimientos = async (req, res) => {
    try {
        const tiposMovimientos = await tipoMovimientos_model_1.TipoMovimientosModel.find()
            .populate('idEdificio', 'identificadorEdificio direccion');
        res.status(200).json({
            ok: true,
            tiposMovimientos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los tipos de movimientos.'
        });
    }
};
exports.getTiposMovimientos = getTiposMovimientos;
const getTipoMovimientoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoMovimiento = await tipoMovimientos_model_1.TipoMovimientosModel.findById(id)
            .populate('idEdificio', 'identificadorEdificio direccion');
        if (!tipoMovimiento) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de movimiento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            tipoMovimiento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el tipo de movimiento.'
        });
    }
};
exports.getTipoMovimientoById = getTipoMovimientoById;
const actualizarTipoMovimiento = async (req, res) => {
    const id = req.params.id;
    const { descripcion, idEdificio, ...campos } = req.body;
    try {
        const tipoMovimientoDB = await tipoMovimientos_model_1.TipoMovimientosModel.findById(id);
        if (!tipoMovimientoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de movimiento no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== tipoMovimientoDB.descripcion) {
            const existeDescripcion = await tipoMovimientos_model_1.TipoMovimientosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un tipo de movimiento con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        if (idEdificio !== undefined && String(idEdificio) !== String(tipoMovimientoDB.idEdificio)) { // Permite setting a null
            if (idEdificio) {
                const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
                if (!existeEdificio) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de edificio proporcionado no existe.'
                    });
                }
            }
            campos.idEdificio = idEdificio;
        }
        // Fin de validación habilitada
        const tipoMovimientoActualizado = await tipoMovimientos_model_1.TipoMovimientosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Tipo de movimiento actualizado exitosamente',
            tipoMovimiento: tipoMovimientoActualizado
        });
    }
    catch (error) { // Añadido ': any' para tipar el error
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el tipo de movimiento.'
        });
    }
};
exports.actualizarTipoMovimiento = actualizarTipoMovimiento;
const eliminarTipoMovimiento = async (req, res) => {
    const id = req.params.id;
    try {
        const tipoMovimientoBorrado = await tipoMovimientos_model_1.TipoMovimientosModel.findByIdAndDelete(id);
        if (!tipoMovimientoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de movimiento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Tipo de movimiento eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el tipo de movimiento.'
        });
    }
};
exports.eliminarTipoMovimiento = eliminarTipoMovimiento;
