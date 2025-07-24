import { Request, Response } from 'express';
import { ExpensasModel, IExpensa } from '../models/expensas.model';
import { HistoricoExpensasModel } from '../models/historicoExpensas.model'; // Para el registro histórico
import { DepartamentosModel } from '../models/departamentos.model';

const crearExpensa = async (req: Request, res: Response) => {
    const { idDepartamento, ordinarias, extraordinarias } = req.body;
    try {


        const existeDepartamento = await DepartamentosModel.findById(idDepartamento);
        if (!existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de departamento proporcionado no existe.'
            });
        }


        const existeExpensaDepartamento = await ExpensasModel.findOne({ idDepartamento });
        if (existeExpensaDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un registro de expensas para este departamento. Use la ruta de actualización.'
            });
        }

        const expensa = new ExpensasModel(req.body);
        await expensa.save();

        // Registrar en el histórico al crear una nueva expensa
        const historicoExpensa = new HistoricoExpensasModel({
            idExpensa: expensa._id,
            idDepartamento: expensa.idDepartamento,
            ordinarias: expensa.ordinarias,
            extraordinarias: expensa.extraordinarias
        });
        await historicoExpensa.save();

        res.status(201).json({
            ok: true,
            msg: 'Registro de expensas creado exitosamente',
            expensa
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el registro de expensas.'
        });
    }
};

const getExpensas = async (req: Request, res: Response) => {
    try {
        const expensas = await ExpensasModel.find().populate('idDepartamento', 'identificacion piso');
        res.status(200).json({
            ok: true,
            expensas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los registros de expensas.'
        });
    }
};

const getExpensaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const expensa = await ExpensasModel.findById(id).populate('idDepartamento', 'identificacion piso');
        if (!expensa) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de expensas no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            expensa
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el registro de expensas.'
        });
    }
};

const actualizarExpensa = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { idDepartamento, ordinarias, extraordinarias, ...campos } = req.body;

    try {
        const expensaDB = await ExpensasModel.findById(id);
        if (!expensaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de expensas no encontrado por ID.'
            });
        }

        // Si se intenta cambiar el idDepartamento, esto es una operación compleja.
        // Por la unicidad del idDepartamento en esta tabla, generalmente no se permite cambiarlo.
        // Si el requisito es mover una expensa de departamento, sería una eliminación y una nueva creación.
        if (idDepartamento && String(idDepartamento) !== String(expensaDB.idDepartamento)) {
            return res.status(400).json({
                ok: false,
                msg: 'No se permite cambiar el departamento de un registro de expensas existente.'
            });
        }

        // Registrar en el histórico ANTES de actualizar la expensa principal, si los valores cambian
        if (ordinarias !== undefined && ordinarias !== expensaDB.ordinarias ||
            extraordinarias !== undefined && extraordinarias !== expensaDB.extraordinarias) {

            const historicoExpensa = new HistoricoExpensasModel({
                idExpensa: expensaDB._id,
                idDepartamento: expensaDB.idDepartamento,
                ordinarias: expensaDB.ordinarias, // Guardar los valores ANTERIORES
                extraordinarias: expensaDB.extraordinarias // Guardar los valores ANTERIORES
            });
            await historicoExpensa.save();
        }

        // Actualizar la expensa principal
        const expensaActualizada = await ExpensasModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'Registro de expensas actualizado exitosamente',
            expensa: expensaActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el registro de expensas.'
        });
    }
};

const eliminarExpensa = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const expensaBorrada = await ExpensasModel.findByIdAndDelete(id);
        if (!expensaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Registro de expensas no encontrado por ID.'
            });
        }
        // Opcional: Podrías considerar registrar en el histórico que la expensa fue "eliminada" o "desactivada"
        // aunque esta tabla es más para el registro actual.
        // Si hay un borrado lógico en ExpensasModel, aquí sería cambiar `habilitado: false`.

        res.status(200).json({
            ok: true,
            msg: 'Registro de expensas eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el registro de expensas.'
        });
    }
};

export {
    crearExpensa,
    getExpensas,
    getExpensaById,
    actualizarExpensa,
    eliminarExpensa
};