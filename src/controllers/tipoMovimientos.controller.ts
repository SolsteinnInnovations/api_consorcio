import { Request, Response } from 'express';
import { TipoMovimientosModel, ITipoMovimiento } from '../models/tipoMovimientos.model';
import { EdificiosModel } from '../models/edificios.model';

const crearTipoMovimiento = async (req: Request, res: Response) => {
    const { descripcion, idEdificio } = req.body;
    try {
        const existeTipoMovimiento = await TipoMovimientosModel.findOne({ descripcion });
        if (existeTipoMovimiento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un tipo de movimiento con esa descripción.'
            });
        }
        if (idEdificio) {
            const existeEdificio = await EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
        }
        // Fin de validación habilitada

        const tipoMovimiento = new TipoMovimientosModel(req.body);
        await tipoMovimiento.save();
        res.status(201).json({
            ok: true,
            msg: 'Tipo de movimiento creado exitosamente',
            tipoMovimiento
        });
    } catch (error: any) { // Añadido ': any' para tipar el error
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

const getTiposMovimientos = async (req: Request, res: Response) => {
    try {
        const tiposMovimientos = await TipoMovimientosModel.find()
            .populate('idEdificio', 'identificadorEdificio direccion');
        res.status(200).json({
            ok: true,
            tiposMovimientos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los tipos de movimientos.'
        });
    }
};

const getTipoMovimientoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tipoMovimiento = await TipoMovimientosModel.findById(id)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el tipo de movimiento.'
        });
    }
};

const actualizarTipoMovimiento = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, idEdificio, ...campos } = req.body;
    try {
        const tipoMovimientoDB = await TipoMovimientosModel.findById(id);
        if (!tipoMovimientoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de movimiento no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== tipoMovimientoDB.descripcion) {
            const existeDescripcion = await TipoMovimientosModel.findOne({ descripcion });
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
                const existeEdificio = await EdificiosModel.findById(idEdificio);
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

        const tipoMovimientoActualizado = await TipoMovimientosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Tipo de movimiento actualizado exitosamente',
            tipoMovimiento: tipoMovimientoActualizado
        });
    } catch (error: any) { // Añadido ': any' para tipar el error
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

const eliminarTipoMovimiento = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tipoMovimientoBorrado = await TipoMovimientosModel.findByIdAndDelete(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el tipo de movimiento.'
        });
    }
};

export {
    crearTipoMovimiento,
    getTiposMovimientos,
    getTipoMovimientoById,
    actualizarTipoMovimiento,
    eliminarTipoMovimiento
};