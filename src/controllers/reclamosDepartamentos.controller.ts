import { Request, Response } from 'express';
import { ReclamosDepartamentosModel, IReclamoDepartamento } from '../models/reclamosDepartamentos.model';
import { ReclamosModel } from '../models/reclamos.model';
import { DepartamentosModel } from '../models/departamentos.model';

const crearReclamoDepartamento = async (req: Request, res: Response) => {
    const { idReclamo, idDepartamento } = req.body;
    try {
        const existeReclamo = await ReclamosModel.findById(idReclamo);
        if (!existeReclamo) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de reclamo proporcionado no existe.'
            });
        }

        const existeDepartamento = await DepartamentosModel.findById(idDepartamento);
        if (!existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de departamento proporcionado no existe.'
            });
        }

        const existeRelacion = await ReclamosDepartamentosModel.findOne({ idReclamo, idDepartamento });
        if (existeRelacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Este departamento ya está asociado a este reclamo.'
            });
        }

        const reclamoDepartamento = new ReclamosDepartamentosModel(req.body);
        await reclamoDepartamento.save();
        res.status(201).json({
            ok: true,
            msg: 'Relación reclamo-departamento creada exitosamente',
            reclamoDepartamento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la relación reclamo-departamento.'
        });
    }
};

const getReclamosDepartamentos = async (req: Request, res: Response) => {
    try {
        const reclamosDepartamentos = await ReclamosDepartamentosModel.find()
            .populate('idReclamo', 'identificacion titulo') // Muestra identificación y título del reclamo
            .populate('idDepartamento', 'identificacion piso idEdificio'); // Muestra identificación, piso del departamento
        res.status(200).json({
            ok: true,
            reclamosDepartamentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las relaciones reclamo-departamento.'
        });
    }
};

const getReclamoDepartamentoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reclamoDepartamento = await ReclamosDepartamentosModel.findById(id)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la relación reclamo-departamento.'
        });
    }
};

const eliminarReclamoDepartamento = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const reclamoDepartamentoBorrado = await ReclamosDepartamentosModel.findByIdAndDelete(id);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la relación reclamo-departamento.'
        });
    }
};

export {
    crearReclamoDepartamento,
    getReclamosDepartamentos,
    getReclamoDepartamentoById,
    eliminarReclamoDepartamento
};