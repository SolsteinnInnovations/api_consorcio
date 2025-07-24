import { Request, Response } from 'express';
import { ProvinciasModel, IProvincia } from '../models/provincias.model';
import { PaisesModel } from '../models/paises.model'; // Para validar idPais

const crearProvincia = async (req: Request, res: Response) => {
    const { descripcion, idPais } = req.body;
    try {
        const existeProvincia = await ProvinciasModel.findOne({ descripcion });
        if (existeProvincia) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una provincia con esa descripción.'
            });
        }
        const existePais = await PaisesModel.findById(idPais);
        if (!existePais) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de país proporcionado no existe.'
            });
        }

        const provincia = new ProvinciasModel(req.body);
        await provincia.save();
        res.status(201).json({
            ok: true,
            msg: 'Provincia creada exitosamente',
            provincia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la provincia.'
        });
    }
};

const getProvincias = async (req: Request, res: Response) => {
    try {
        const provincias = await ProvinciasModel.find().populate('idPais', 'descripcion');
        res.status(200).json({
            ok: true,
            provincias
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las provincias.'
        });
    }
};

const getProvinciaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const provincia = await ProvinciasModel.findById(id).populate('idPais', 'descripcion');
        if (!provincia) {
            return res.status(404).json({
                ok: false,
                msg: 'Provincia no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            provincia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la provincia.'
        });
    }
};

const actualizarProvincia = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, idPais, ...campos } = req.body;
    try {
        const provinciaDB = await ProvinciasModel.findById(id);
        if (!provinciaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Provincia no encontrada por ID.'
            });
        }

        if (descripcion && descripcion !== provinciaDB.descripcion) {
            const existeDescripcion = await ProvinciasModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una provincia con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }

        if (idPais && String(idPais) !== String(provinciaDB.idPais)) {
            const existePais = await PaisesModel.findById(idPais);
            if (!existePais) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de país proporcionado no existe.'
                });
            }
            campos.idPais = idPais;
        }

        const provinciaActualizada = await ProvinciasModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Provincia actualizada exitosamente',
            provincia: provinciaActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la provincia.'
        });
    }
};

const eliminarProvincia = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        // La eliminación de provincias podría necesitar lógica para evitar eliminar provincias con localidades asociadas.
        // Por ahora, implementamos eliminación física simple.
        const provinciaBorrada = await ProvinciasModel.findByIdAndDelete(id);
        if (!provinciaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Provincia no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Provincia eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la provincia.'
        });
    }
};

export {
    crearProvincia,
    getProvincias,
    getProvinciaById,
    actualizarProvincia,
    eliminarProvincia
};