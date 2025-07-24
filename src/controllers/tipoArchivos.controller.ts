import { Request, Response } from 'express';
import { TipoArchivosModel, ITipoArchivo } from '../models/tipoArchivos.model';
import { EdificiosModel } from '../models/edificios.model';

const crearTipoArchivo = async (req: Request, res: Response) => {
    const { descripcion, idEdificio } = req.body;
    try {
        const existeTipoArchivo = await TipoArchivosModel.findOne({ descripcion });
        if (existeTipoArchivo) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un tipo de archivo con esa descripción.'
            });
        }

        if (idEdificio) {
            const existeEdificio = await EdificiosModel.findById(idEdificio);
            if (!existeEdificio) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de edificio proporcionado no existe.'
                });
            }
        }
        // Fin de validación habilitada

        const tipoArchivo = new TipoArchivosModel(req.body);
        await tipoArchivo.save();
        res.status(201).json({
            ok: true,
            msg: 'Tipo de archivo creado exitosamente',
            tipoArchivo
        });
    } catch (error: any) { // Se añade ': any' para tipar el error y acceder a 'error.message'
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el tipo de archivo.'
        });
    }
};

const getTiposArchivos = async (req: Request, res: Response) => {
    try {
        const tiposArchivos = await TipoArchivosModel.find()
            .populate('idEdificio', 'identificadorEdificio direccion');
        res.status(200).json({
            ok: true,
            tiposArchivos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los tipos de archivos.'
        });
    }
};

const getTipoArchivoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tipoArchivo = await TipoArchivosModel.findById(id)
            .populate('idEdificio', 'identificadorEdificio direccion');
        if (!tipoArchivo) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de archivo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            tipoArchivo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el tipo de archivo.'
        });
    }
};

const actualizarTipoArchivo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { descripcion, idEdificio, ...campos } = req.body;
    try {
        const tipoArchivoDB = await TipoArchivosModel.findById(id);
        if (!tipoArchivoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de archivo no encontrado por ID.'
            });
        }
        if (descripcion && descripcion !== tipoArchivoDB.descripcion) {
            const existeDescripcion = await TipoArchivosModel.findOne({ descripcion });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un tipo de archivo con esa descripción.'
                });
            }
            campos.descripcion = descripcion;
        }

        if (idEdificio !== undefined && String(idEdificio) !== String(tipoArchivoDB.idEdificio)) { // Permite setting a null
            if (idEdificio) {
                const existeEdificio = await EdificiosModel.findById(idEdificio);
                if (!existeEdificio) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de edificio proporcionado no existe.'
                    });
                }
            }
            campos.idEdificio = idEdificio;
        }
        // Fin de validación habilitada

        const tipoArchivoActualizado = await TipoArchivosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Tipo de archivo actualizado exitosamente',
            tipoArchivo: tipoArchivoActualizado
        });
    } catch (error: any) { // Se añade ': any' para tipar el error y acceder a 'error.message'
        console.error(error);
        if (error.name === 'ValidationError') { // Manejo de errores de validación de Mongoose
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        }
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el tipo de archivo.'
        });
    }
};

const eliminarTipoArchivo = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const tipoArchivoBorrado = await TipoArchivosModel.findByIdAndDelete(id);
        if (!tipoArchivoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de archivo no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Tipo de archivo eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el tipo de archivo.'
        });
    }
};

export {
    crearTipoArchivo,
    getTiposArchivos,
    getTipoArchivoById,
    actualizarTipoArchivo,
    eliminarTipoArchivo
};