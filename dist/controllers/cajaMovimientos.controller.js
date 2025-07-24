"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaldoCajaByEdificio = exports.eliminarCajaMovimiento = exports.actualizarCajaMovimiento = exports.getCajaMovimientoById = exports.getCajaMovimientos = exports.crearCajaMovimiento = void 0;
const cajaMovimientos_model_1 = require("../models/cajaMovimientos.model");
const reclamos_model_1 = require("../models/reclamos.model");
const tipoMovimientos_model_1 = require("../models/tipoMovimientos.model");
const edificios_model_1 = require("../models/edificios.model");
const crearCajaMovimiento = async (req, res) => {
    const { ingreso, egreso, idReclamo, idTipoMovimiento, idEdificio } = req.body;
    try {
        // Validar existencia de Reclamo si se proporciona
        if (idReclamo) {
            const existeReclamo = await reclamos_model_1.ReclamosModel.findById(idReclamo);
            if (!existeReclamo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de reclamo proporcionado no existe.'
                });
            }
        }
        // Validar existencia de TipoMovimiento
        const existeTipoMovimiento = await tipoMovimientos_model_1.TipoMovimientosModel.findById(idTipoMovimiento);
        if (!existeTipoMovimiento) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de tipo de movimiento proporcionado no existe.'
            });
        }
        // Validar existencia de Edificio
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        // Calcular saldo anterior y actual.
        // Aquí necesitamos obtener el último saldo del edificio para calcular el saldo anterior.
        // Esto asume que hay un historial de movimientos y queremos el último saldo para ese edificio.
        const ultimoMovimiento = await cajaMovimientos_model_1.CajaMovimientosModel.findOne({ idEdificio })
            .sort({ fechaMovimiento: -1 })
            .exec();
        const saldoAnterior = ultimoMovimiento ? ultimoMovimiento.saldoActual : 0;
        let saldoActual = saldoAnterior;
        if (ingreso > 0) {
            saldoActual += ingreso;
        }
        else if (egreso > 0) {
            saldoActual -= egreso;
        }
        else {
            return res.status(400).json({
                ok: false,
                msg: 'Debe especificar un monto para el ingreso o el egreso.'
            });
        }
        // Preparar el objeto de movimiento
        const movimientoData = {
            ...req.body,
            saldoAnterior,
            saldoActual,
            // Asegurarse de que ingreso y egreso sean 0 si no se especifican, para la validación del modelo
            ingreso: ingreso || 0,
            egreso: egreso || 0
        };
        const cajaMovimiento = new cajaMovimientos_model_1.CajaMovimientosModel(movimientoData);
        await cajaMovimiento.save();
        res.status(201).json({
            ok: true,
            msg: 'Movimiento de caja creado exitosamente',
            cajaMovimiento
        });
    }
    catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el movimiento de caja.'
        });
    }
};
exports.crearCajaMovimiento = crearCajaMovimiento;
const getCajaMovimientos = async (req, res) => {
    try {
        const cajaMovimientos = await cajaMovimientos_model_1.CajaMovimientosModel.find()
            .populate('idReclamo', 'identificacion titulo')
            .populate('idTipoMovimiento', 'descripcion')
            .populate('idEdificio', 'direccion identificadorEdificio');
        res.status(200).json({
            ok: true,
            cajaMovimientos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los movimientos de caja.'
        });
    }
};
exports.getCajaMovimientos = getCajaMovimientos;
const getCajaMovimientoById = async (req, res) => {
    const id = req.params.id;
    try {
        const cajaMovimiento = await cajaMovimientos_model_1.CajaMovimientosModel.findById(id)
            .populate('idReclamo', 'identificacion titulo')
            .populate('idTipoMovimiento', 'descripcion')
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!cajaMovimiento) {
            return res.status(404).json({
                ok: false,
                msg: 'Movimiento de caja no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            cajaMovimiento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el movimiento de caja.'
        });
    }
};
exports.getCajaMovimientoById = getCajaMovimientoById;
const actualizarCajaMovimiento = async (req, res) => {
    const id = req.params.id;
    const { idReclamo, idTipoMovimiento, idEdificio, ...campos } = req.body;
    try {
        const cajaMovimientoDB = await cajaMovimientos_model_1.CajaMovimientosModel.findById(id);
        if (!cajaMovimientoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Movimiento de caja no encontrado por ID.'
            });
        }
        // Validaciones para campos referenciados si se intentan cambiar
        if (idReclamo && String(idReclamo) !== String(cajaMovimientoDB.idReclamo)) {
            const existeReclamo = await reclamos_model_1.ReclamosModel.findById(idReclamo);
            if (!existeReclamo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de reclamo proporcionado no existe.'
                });
            }
            campos.idReclamo = idReclamo;
        }
        else if (idReclamo === null) { // Permite desasociar el reclamo
            campos.idReclamo = null;
        }
        if (idTipoMovimiento && String(idTipoMovimiento) !== String(cajaMovimientoDB.idTipoMovimiento)) {
            const existeTipoMovimiento = await tipoMovimientos_model_1.TipoMovimientosModel.findById(idTipoMovimiento);
            if (!existeTipoMovimiento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de tipo de movimiento proporcionado no existe.'
                });
            }
            campos.idTipoMovimiento = idTipoMovimiento;
        }
        if (idEdificio && String(idEdificio) !== String(cajaMovimientoDB.idEdificio)) {
            const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
            campos.idEdificio = idEdificio;
        }
        // NOTA IMPORTANTE: La actualización de `ingreso`, `egreso`, `saldoAnterior` y `saldoActual`
        // es una operación delicada para una tabla de movimientos financieros.
        // Generalmente, estos campos no deberían ser modificables después de la creación,
        // ya que cambiar un movimiento anterior alteraría todos los saldos posteriores.
        // Si se necesita una corrección, lo ideal es registrar un nuevo movimiento de "ajuste".
        // Por simplicidad en este CRUD, permito la actualización, pero ten en cuenta esta consideración.
        // Si no los quieres modificables, quítalos de `campos` o implementa una lógica de negocio más estricta.
        const cajaMovimientoActualizado = await cajaMovimientos_model_1.CajaMovimientosModel.findByIdAndUpdate(id, campos, { new: true });
        // Si se actualizaron los montos o el edificio, necesitarías recalcular saldos posteriores.
        // Esto es un proceso complejo que generalmente se maneja con un servicio de contabilidad
        // o un proceso batch, no en una simple actualización REST.
        // Por ahora, asumimos que los `saldoAnterior` y `saldoActual` enviados en la actualización
        // (si se permiten) son correctos, o que el modelo los recalculará si la lógica lo permite.
        // Para este controlador, si se actualiza ingreso/egreso, el `saldoActual` del documento
        // actualizado se recalculará automáticamente por el hook `pre('save')` si lo tuviéramos,
        // pero no afectaría a los movimientos posteriores.
        res.status(200).json({
            ok: true,
            msg: 'Movimiento de caja actualizado exitosamente',
            cajaMovimiento: cajaMovimientoActualizado
        });
    }
    catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el movimiento de caja.'
        });
    }
};
exports.actualizarCajaMovimiento = actualizarCajaMovimiento;
const eliminarCajaMovimiento = async (req, res) => {
    const id = req.params.id;
    try {
        const cajaMovimientoBorrado = await cajaMovimientos_model_1.CajaMovimientosModel.findByIdAndDelete(id);
        if (!cajaMovimientoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Movimiento de caja no encontrado por ID.'
            });
        }
        // NOTA: Eliminar un movimiento de caja anterior tiene un impacto significativo
        // en los saldos de todos los movimientos posteriores de ese edificio.
        // Para una aplicación real, esto requeriría un recálculo complejo o un
        // borrado lógico (`habilitado: false`). Para este CRUD simple, se realiza el borrado físico.
        res.status(200).json({
            ok: true,
            msg: 'Movimiento de caja eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el movimiento de caja.'
        });
    }
};
exports.eliminarCajaMovimiento = eliminarCajaMovimiento;
// Función adicional para obtener el saldo actual de un edificio
const getSaldoCajaByEdificio = async (req, res) => {
    const idEdificio = req.params.idEdificio;
    try {
        const ultimoMovimiento = await cajaMovimientos_model_1.CajaMovimientosModel.findOne({ idEdificio })
            .sort({ fechaMovimiento: -1 })
            .exec();
        const saldoActual = ultimoMovimiento ? ultimoMovimiento.saldoActual : 0;
        res.status(200).json({
            ok: true,
            idEdificio,
            saldoActual
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el saldo de caja del edificio.'
        });
    }
};
exports.getSaldoCajaByEdificio = getSaldoCajaByEdificio;
