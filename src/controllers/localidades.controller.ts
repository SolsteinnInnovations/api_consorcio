import { Request, Response } from 'express';
import { LocalidadesModel, ILocalidad } from '../models/localidades.model';
import { ProvinciasModel } from '../models/provincias.model'; // Para validar idProvincia

const crearLocalidad = async (req: Request, res: Response) => {
    const { descripcion, codigoPostal, idProvincia } = req.body;
    try {
        const existeLocalidad = await LocalidadesModel.findOne({ descripcion });
        if (existeLocalidad) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una localidad con esa descripción.'
            });
        }
        const existeProvincia = await ProvinciasModel.findById(idProvincia);
        if (!existeProvincia) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de provincia proporcionado no existe.'
            });
        }

        const localidad = new LocalidadesModel(req.body);
        await localidad.save();
        res.status(201).json({
            ok: true,
            msg: 'Localidad creada exitosamente',
            localidad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la localidad.'
        });
    }
};

const getLocalidades = async (req: Request, res: Response) => {
    try {
        const localidades = await LocalidadesModel.find().populate('idProvincia', 'descripcion').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'descripcion'
            }
        });
        res.status(200).json({
            ok: true,
            localidades
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las localidades.'
        });
    }
};

const getLocalidadById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const localidad = await LocalidadesModel.findById(id).populate('idProvincia', 'descripcion').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'descripcion'
            }
        });
        if (!localidad) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            localidad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la localidad.'
        });
    }
};

const actualizarLocalidad = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, idProvincia, ...campos } = req.body;
    try {
        const localidadDB = await LocalidadesModel.findById(id);
        if (!localidadDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }

        if (descripcion && descripcion !== localidadDB.descripcion) {
            const existeDescripcion = await LocalidadesModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una localidad con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }

        if (idProvincia && String(idProvincia) !== String(localidadDB.idProvincia)) {
            const existeProvincia = await ProvinciasModel.findById(idProvincia);
            if (!existeProvincia) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de provincia proporcionado no existe.'
                });
            }
            campos.idProvincia = idProvincia;
        }

        const localidadActualizada = await LocalidadesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Localidad actualizada exitosamente',
            localidad: localidadActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la localidad.'
        });
    }
};

const eliminarLocalidad = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const localidadBorrada = await LocalidadesModel.findByIdAndDelete(id);
        if (!localidadBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Localidad eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la localidad.'
        });
    }
};

export {
    crearLocalidad,
    getLocalidades,
    getLocalidadById,
    actualizarLocalidad,
    eliminarLocalidad
};