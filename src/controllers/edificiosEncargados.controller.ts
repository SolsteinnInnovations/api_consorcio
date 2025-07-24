import { Request, Response } from 'express';
import { EdificiosEncargadosModel, IEdificioEncargado } from '../models/edificiosEncargados.model';
import { PersonasModel } from '../models/personas.model';
import { EdificiosModel } from '../models/edificios.model';

const crearEdificioEncargado = async (req: Request, res: Response) => {
    const { idPersona, idEdificio } = req.body;
    try {
        const existePersona = await PersonasModel.findById(idPersona);
        if (!existePersona) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de persona proporcionado no existe.'
            });
        }
        if (!existePersona.encargado) {
            return res.status(400).json({
                ok: false,
                msg: 'La persona debe tener el campo "encargado" en true para ser asignada como encargada de un edificio.'
            });
        }

        const existeEdificio = await EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }

        const existeRelacion = await EdificiosEncargadosModel.findOne({ idPersona, idEdificio });
        if (existeRelacion) {
            return res.status(400).json({
                ok: false,
                msg: 'Esta persona ya es encargada de este edificio.'
            });
        }

        const edificioEncargado = new EdificiosEncargadosModel(req.body);
        await edificioEncargado.save();
        res.status(201).json({
            ok: true,
            msg: 'Relación edificio-encargado creada exitosamente',
            edificioEncargado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la relación edificio-encargado.'
        });
    }
};

const getEdificiosEncargados = async (req: Request, res: Response) => {
    try {
        const edificiosEncargados = await EdificiosEncargadosModel.find()
            .populate('idPersona', 'nombres apellidos documento') // Muestra los nombres, apellidos y documento del encargado
            .populate('idEdificio', 'direccion identificadorEdificio'); // Muestra la dirección e identificador del edificio
        res.status(200).json({
            ok: true,
            edificiosEncargados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las relaciones edificio-encargado.'
        });
    }
};

const getEdificioEncargadoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const edificioEncargado = await EdificiosEncargadosModel.findById(id)
            .populate('idPersona', 'nombres apellidos documento')
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!edificioEncargado) {
            return res.status(404).json({
                ok: false,
                msg: 'Relación edificio-encargado no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            edificioEncargado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la relación edificio-encargado.'
        });
    }
};

const eliminarEdificioEncargado = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const edificioEncargadoBorrado = await EdificiosEncargadosModel.findByIdAndDelete(id);
        if (!edificioEncargadoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Relación edificio-encargado no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Relación edificio-encargado eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la relación edificio-encargado.'
        });
    }
};

export {
    crearEdificioEncargado,
    getEdificiosEncargados,
    getEdificioEncargadoById,
    eliminarEdificioEncargado
};