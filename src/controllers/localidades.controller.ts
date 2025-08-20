import { Request, Response } from 'express';
import { LocalidadesModel, ILocalidad } from '../models/localidades.model';
import { ProvinciasModel } from '../models/provincias.model'; // Para validar idProvincia
import { localidadBulk } from '../services/LocalidadService';


const crearLocalidadBulk = async (req: Request, res: Response) => {    
    try{
        await LocalidadesModel.syncIndexes();
        await localidadBulk();
        res.status(201).json({
            ok: true,
            msg: 'Localidades creadas exitosamente',
        });
    }catch(error){
        console.error("Error al insertar localidades:", error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la localidad.'
        });
    }
}
const crearLocalidad = async (req: Request, res: Response) => {
    const { nombre, codigoPostal, idProvincia } = req.body;

    try {

        if (!nombre || !codigoPostal || !idProvincia) {
            return res.status(400).json({
                ok: false,
                msg: 'Los campos nombre, código postal e idProvincia son obligatorios.'
            });
        }

        if(isNaN(+codigoPostal)) {
            return res.status(400).json({
                ok: false,
                msg: 'El código postal debe ser un número.'
            });
        }
        
        const existeLocalidad = await LocalidadesModel.findOne({ nombre });
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
        localidad.nombre = nombre.toUpperCase(); // Asegura que el nombre esté en mayúsculas
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
        const localidades = await LocalidadesModel.find().populate('idProvincia', 'nombre').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'nombre'
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
        const localidad = await LocalidadesModel.findById(id).populate('idProvincia', 'nombre').populate({
            path: 'idProvincia',
            populate: {
                path: 'idPais',
                select: 'nombre'
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
    const { nombre, idProvincia, ...campos } = req.body;
    try {
        const localidadDB = await LocalidadesModel.findById(id);
        if (!localidadDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Localidad no encontrada por ID.'
            });
        }

        if (nombre && nombre !== localidadDB.nombre) {
            const existeDescripcion = await LocalidadesModel.findOne({ nombre });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una localidad con esa descripción.'
                });
            }
            campos.nombre = nombre;
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
    eliminarLocalidad,
    crearLocalidadBulk
};