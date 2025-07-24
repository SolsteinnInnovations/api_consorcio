"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarExpensa = exports.actualizarExpensa = exports.getExpensaById = exports.getExpensas = exports.crearExpensa = void 0;
const expensas_model_1 = require("../models/expensas.model");
const historicoExpensas_model_1 = require("../models/historicoExpensas.model"); // Para el registro histórico
const departamentos_model_1 = require("../models/departamentos.model");
const crearExpensa = async (req, res) => {
    const { idDepartamento, ordinarias, extraordinarias } = req.body;
    try {
        const existeDepartamento = await departamentos_model_1.DepartamentosModel.findById(idDepartamento);
        if (!existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de departamento proporcionado no existe.'
            });
        }
        const existeExpensaDepartamento = await expensas_model_1.ExpensasModel.findOne({ idDepartamento });
        if (existeExpensaDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un registro de expensas para este departamento. Use la ruta de actualización.'
            });
        }
        const expensa = new expensas_model_1.ExpensasModel(req.body);
        await expensa.save();
        // Registrar en el histórico al crear una nueva expensa
        const historicoExpensa = new historicoExpensas_model_1.HistoricoExpensasModel({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el registro de expensas.'
        });
    }
};
exports.crearExpensa = crearExpensa;
const getExpensas = async (req, res) => {
    try {
        const expensas = await expensas_model_1.ExpensasModel.find().populate('idDepartamento', 'identificacion piso');
        res.status(200).json({
            ok: true,
            expensas
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los registros de expensas.'
        });
    }
};
exports.getExpensas = getExpensas;
const getExpensaById = async (req, res) => {
    const id = req.params.id;
    try {
        const expensa = await expensas_model_1.ExpensasModel.findById(id).populate('idDepartamento', 'identificacion piso');
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el registro de expensas.'
        });
    }
};
exports.getExpensaById = getExpensaById;
const actualizarExpensa = async (req, res) => {
    const id = req.params.id;
    const { idDepartamento, ordinarias, extraordinarias, ...campos } = req.body;
    try {
        const expensaDB = await expensas_model_1.ExpensasModel.findById(id);
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
            const historicoExpensa = new historicoExpensas_model_1.HistoricoExpensasModel({
                idExpensa: expensaDB._id,
                idDepartamento: expensaDB.idDepartamento,
                ordinarias: expensaDB.ordinarias, // Guardar los valores ANTERIORES
                extraordinarias: expensaDB.extraordinarias // Guardar los valores ANTERIORES
            });
            await historicoExpensa.save();
        }
        // Actualizar la expensa principal
        const expensaActualizada = await expensas_model_1.ExpensasModel.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Registro de expensas actualizado exitosamente',
            expensa: expensaActualizada
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el registro de expensas.'
        });
    }
};
exports.actualizarExpensa = actualizarExpensa;
const eliminarExpensa = async (req, res) => {
    const id = req.params.id;
    try {
        const expensaBorrada = await expensas_model_1.ExpensasModel.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el registro de expensas.'
        });
    }
};
exports.eliminarExpensa = eliminarExpensa;
