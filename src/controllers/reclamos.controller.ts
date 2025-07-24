import { Request, Response } from 'express';
import { ReclamosModel, IReclamo } from '../models/reclamos.model';
import { CajaMovimientosModel } from '../models/cajaMovimientos.model';

const crearReclamo = async (req: Request, res: Response) => {
    const { identificacion, idCajaMovimiento, fechaInicio, fechaFin } = req.body;
    try {
        const existeReclamo = await ReclamosModel.findOne({ identificacion });
        if (existeReclamo) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un reclamo con esa identificación.'
            });
        }


        if (idCajaMovimiento) {
            const existeCajaMovimiento = await CajaMovimientosModel.findById(idCajaMovimiento);
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

        const reclamo = new ReclamosModel(req.body);
        await reclamo.save();
        res.status(201).json({
            ok: true,
            msg: 'Reclamo creado exitosamente',
            reclamo
        });
    } catch (error: any) { // Añadido : any para tipar el error
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

const getReclamos = async (req: Request, res: Response) => {
    try {
        const reclamos = await ReclamosModel.find()
            .populate('idCajaMovimiento', 'descripcion ingreso egreso fechaMovimiento');
        res.status(200).json({
            ok: true,
            reclamos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los reclamos.'
        });
    }
};

const getReclamoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reclamo = await ReclamosModel.findById(id)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el reclamo.'
        });
    }
};

const actualizarReclamo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { identificacion, idCajaMovimiento, fechaInicio, fechaFin, ...campos } = req.body;
    try {
        const reclamoDB = await ReclamosModel.findById(id);
        if (!reclamoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Reclamo no encontrado por ID.'
            });
        }

        if (identificacion && identificacion !== reclamoDB.identificacion) {
            const existeIdentificacion = await ReclamosModel.findOne({ identificacion });
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
                const existeCajaMovimiento = await CajaMovimientosModel.findById(idCajaMovimiento);
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
        if (fechaInicio) campos.fechaInicio = fechaInicio;
        if (fechaFin) campos.fechaFin = fechaFin;


        const reclamoActualizado = await ReclamosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Reclamo actualizado exitosamente',
            reclamo: reclamoActualizado
        });
    } catch (error: any) { // Añadido : any para tipar el error
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

const eliminarReclamo = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reclamoBorrado = await ReclamosModel.findByIdAndDelete(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el reclamo.'
        });
    }
};

export {
    crearReclamo,
    getReclamos,
    getReclamoById,
    actualizarReclamo,
    eliminarReclamo
};