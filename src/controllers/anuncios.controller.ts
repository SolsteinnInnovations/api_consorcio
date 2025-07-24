import { Request, Response } from 'express';
import { AnunciosModel, IAnuncio } from '../models/anuncios.model';
import { EdificiosModel } from '../models/edificios.model';

const crearAnuncio = async (req: Request, res: Response) => {
    const { identificacion, idEdificio } = req.body;
    try {
        const existeAnuncio = await AnunciosModel.findOne({ identificacion });
        if (existeAnuncio) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un anuncio con esa identificación.'
            });
        }

        const existeEdificio = await EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }

        const anuncio = new AnunciosModel(req.body);
        await anuncio.save();
        res.status(201).json({
            ok: true,
            msg: 'Anuncio creado exitosamente',
            anuncio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el anuncio.'
        });
    }
};

const getAnuncios = async (req: Request, res: Response) => {
    try {
        const anuncios = await AnunciosModel.find()
            .populate('idEdificio', 'direccion identificadorEdificio');
        res.status(200).json({
            ok: true,
            anuncios
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los anuncios.'
        });
    }
};

const getAnuncioById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const anuncio = await AnunciosModel.findById(id)
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!anuncio) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            anuncio
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el anuncio.'
        });
    }
};

const actualizarAnuncio = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { identificacion, idEdificio, ...campos } = req.body;
    try {
        const anuncioDB = await AnunciosModel.findById(id);
        if (!anuncioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no encontrado por ID.'
            });
        }

        if (identificacion && identificacion !== anuncioDB.identificacion) {
            const existeIdentificacion = await AnunciosModel.findOne({ identificacion });
            if (existeIdentificacion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un anuncio con esa identificación.'
                });
            }
            campos.identificacion = identificacion;
        }

        if (idEdificio && String(idEdificio) !== String(anuncioDB.idEdificio)) {
            const existeEdificio = await EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
            campos.idEdificio = idEdificio;
        }

        const anuncioActualizado = await AnunciosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Anuncio actualizado exitosamente',
            anuncio: anuncioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el anuncio.'
        });
    }
};

const eliminarAnuncio = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const anuncioBorrado = await AnunciosModel.findByIdAndDelete(id);
        if (!anuncioBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Anuncio eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el anuncio.'
        });
    }
};

export {
    crearAnuncio,
    getAnuncios,
    getAnuncioById,
    actualizarAnuncio,
    eliminarAnuncio
};