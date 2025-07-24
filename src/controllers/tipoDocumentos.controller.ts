import { Request, Response } from 'express';
import { TipoDocumentosModel, ITipoDocumento } from '../models/tipoDocumentos.model';

const crearTipoDocumento = async (req: Request, res: Response) => {
    const { descripcion } = req.body;
    try {
        const existeTipoDocumento = await TipoDocumentosModel.findOne({ descripcion });
        if (existeTipoDocumento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un tipo de documento con esa descripción.'
            });
        }
        const tipoDocumento = new TipoDocumentosModel(req.body);
        await tipoDocumento.save();
        res.status(201).json({
            ok: true,
            msg: 'Tipo de documento creado exitosamente',
            tipoDocumento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el tipo de documento.'
        });
    }
};

const getTiposDocumentos = async (req: Request, res: Response) => {
    try {
        const tiposDocumentos = await TipoDocumentosModel.find();
        res.status(200).json({
            ok: true,
            tiposDocumentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los tipos de documentos.'
        });
    }
};

const getTipoDocumentoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tipoDocumento = await TipoDocumentosModel.findById(id);
        if (!tipoDocumento) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de documento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            tipoDocumento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el tipo de documento.'
        });
    }
};

const actualizarTipoDocumento = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, ...campos } = req.body;
    try {
        const tipoDocumentoDB = await TipoDocumentosModel.findById(id);
        if (!tipoDocumentoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de documento no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== tipoDocumentoDB.descripcion) {
            const existeDescripcion = await TipoDocumentosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un tipo de documento con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }
        const tipoDocumentoActualizado = await TipoDocumentosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Tipo de documento actualizado exitosamente',
            tipoDocumento: tipoDocumentoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el tipo de documento.'
        });
    }
};

const eliminarTipoDocumento = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tipoDocumentoBorrado = await TipoDocumentosModel.findByIdAndDelete(id);
        if (!tipoDocumentoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de documento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Tipo de documento eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el tipo de documento.'
        });
    }
};

export {
    crearTipoDocumento,
    getTiposDocumentos,
    getTipoDocumentoById,
    actualizarTipoDocumento,
    eliminarTipoDocumento
};