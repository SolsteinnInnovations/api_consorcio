import { Request, Response } from 'express';
import { HistoricoExpensasModel, IHistoricoExpensa } from '../models/historicoExpensas.model';
import { ExpensasModel } from '../models/expensas.model';
import { DepartamentosModel } from '../models/departamentos.model';

// NOTA: La creación de registros en HistoricoExpensas se hace principalmente desde el controlador de Expensas
// Sin embargo, proveemos las rutas CRUD básicas por si acaso son necesarias.

const crearHistoricoExpensa = async (req: Request, res: Response) => {
    const { idExpensa, idDepartamento, ordinarias, extraordinarias } = req.body;
    try {
        // Validaciones habilitadas
        const existeExpensa = await ExpensasModel.findById(idExpensa);
        if (!existeExpensa) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de expensa principal proporcionado no existe.'
            });
        }
        const existeDepartamento = await DepartamentosModel.findById(idDepartamento);
        if (!existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de departamento proporcionado no existe.'
            });
        }
        // Fin de validaciones habilitadas

        const historicoExpensa = new HistoricoExpensasModel(req.body);
        await historicoExpensa.save();
        res.status(201).json({
            ok: true,
            msg: 'Registro histórico de expensas creado exitosamente',
            historicoExpensa
        });
    } catch (error: any) { // Se añade ': any' para tipar el error y acceder a 'error.message'
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el registro histórico de expensas.'
        });
    }
};

const getHistoricoExpensas = async (req: Request, res: Response) => {
    try {
        const historicoExpensas = await HistoricoExpensasModel.find()
            .populate('idExpensa', 'periodo fechaVencimiento ordinarias extraordinarias estado') // Se seleccionan campos relevantes de Expensa
            .populate('idDepartamento', 'identificacion piso');
        res.status(200).json({
            ok: true,
            historicoExpensas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los registros históricos de expensas.'
        });
    }
};

const getHistoricoExpensaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const historicoExpensa = await HistoricoExpensasModel.findById(id)
            .populate('idExpensa', 'periodo fechaVencimiento ordinarias extraordinarias estado') // Se seleccionan campos relevantes de Expensa
            .populate('idDepartamento', 'identificacion piso');
        if (!historicoExpensa) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro histórico de expensas no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            historicoExpensa
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el registro histórico de expensas.'
        });
    }
};

// NOTA: Por la naturaleza de un registro histórico, las actualizaciones directas no son comunes.
// Si se necesita corregir un error, se suele hacer una nueva entrada o un proceso administrativo.
// Sin embargo, incluimos la función por completitud.
const actualizarHistoricoExpensa = async (req: Request, res: Response) => {
    const id = req.params.id;
    // En un histórico, usualmente no se cambian las referencias ni los montos originales
    const { idExpensa, idDepartamento, ...campos } = req.body;
    try {
        const historicoExpensaDB = await HistoricoExpensasModel.findById(id);
        if (!historicoExpensaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro histórico de expensas no encontrado por ID.'
            });
        }

        // Bloquear cambios en idExpensa y idDepartamento si son parte del cuerpo de la solicitud
        if (idExpensa || idDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'No se permite cambiar las referencias de expensa o departamento en un registro histórico.'
            });
        }

        const historicoExpensaActualizado = await HistoricoExpensasModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Registro histórico de expensas actualizado exitosamente',
            historicoExpensa: historicoExpensaActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el registro histórico de expensas.'
        });
    }
};

const eliminarHistoricoExpensa = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const historicoExpensaBorrado = await HistoricoExpensasModel.findByIdAndDelete(id);
        if (!historicoExpensaBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro histórico de expensas no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Registro histórico de expensas eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el registro histórico de expensas.'
        });
    }
};

export {
    crearHistoricoExpensa,
    getHistoricoExpensas,
    getHistoricoExpensaById,
    actualizarHistoricoExpensa,
    eliminarHistoricoExpensa
};