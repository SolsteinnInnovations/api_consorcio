import { Request, Response } from 'express';
import { EdificiosModel, IEdificio } from '../models/edificios.model';
import { LocalidadesModel } from '../models/localidades.model';

const crearEdificio = async (req: Request, res: Response) => {
    const { identificadorEdificio, idLocalidad } = req.body;
    try {
        const existeEdificio = await EdificiosModel.findOne({ identificadorEdificio });
        if (existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un edificio con ese identificador.'
            });
        }
        const existeLocalidad = await LocalidadesModel.findById(idLocalidad);
        if (!existeLocalidad) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de localidad proporcionado no existe.'
            });
        }

        const edificio = new EdificiosModel(req.body);
        await edificio.save();
        res.status(201).json({
            ok: true,
            msg: 'Edificio creado exitosamente',
            edificio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el edificio.'
        });
    }
};

const getEdificios = async (req: Request, res: Response) => {
    try {
        const edificios = await EdificiosModel.find().populate({
            path: 'idLocalidad',
            select: 'descripcion codigoPostal',
            populate: {
                path: 'idProvincia',
                select: 'descripcion',
                populate: {
                    path: 'idPais',
                    select: 'descripcion'
                }
            }
        });
        res.status(200).json({
            ok: true,
            edificios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los edificios.'
        });
    }
};

const getEdificioById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const edificio = await EdificiosModel.findById(id).populate({
            path: 'idLocalidad',
            select: 'descripcion codigoPostal',
            populate: {
                path: 'idProvincia',
                select: 'descripcion',
                populate: {
                    path: 'idPais',
                    select: 'descripcion'
                }
            }
        });
        if (!edificio) {
            return res.status(404).json({
                ok: false,
                msg: 'Edificio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            edificio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el edificio.'
        });
    }
};

const actualizarEdificio = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { identificadorEdificio, idLocalidad, ...campos } = req.body;
    try {
        const edificioDB = await EdificiosModel.findById(id);
        if (!edificioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Edificio no encontrado por ID.'
            });
        }
        if (identificadorEdificio && identificadorEdificio !== edificioDB.identificadorEdificio) {
            const existeIdentificador = await EdificiosModel.findOne({ identificadorEdificio });
            if (existeIdentificador) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un edificio con ese identificador.'
                });
            }
            campos.identificadorEdificio = identificadorEdificio;
        }

        if (idLocalidad && String(idLocalidad) !== String(edificioDB.idLocalidad)) {
            const existeLocalidad = await LocalidadesModel.findById(idLocalidad);
            if (!existeLocalidad) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de localidad proporcionado no existe.'
                });
            }
            campos.idLocalidad = idLocalidad;
        }

        const edificioActualizado = await EdificiosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Edificio actualizado exitosamente',
            edificio: edificioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el edificio.'
        });
    }
};

const eliminarEdificio = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const edificioBorrado = await EdificiosModel.findByIdAndDelete(id);
        if (!edificioBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Edificio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Edificio eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el edificio.'
        });
    }
};

export {
    crearEdificio,
    getEdificios,
    getEdificioById,
    actualizarEdificio,
    eliminarEdificio
};