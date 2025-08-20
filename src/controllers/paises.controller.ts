import { Request, Response } from 'express';
import { PaisesModel, IPais } from '../models/paises.model';
import { createPaises } from '../services/PaisService';

const seedPais = async(req: Request, res: Response) => {

  try {   
    
        await PaisesModel.syncIndexes();
        await createPaises()
        res.status(201).json({
            ok: true,
            msg: 'Países creados exitosamente',
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar países:', error
        });
    }
}

const crearPais = async (req: Request, res: Response) => {
    const { descripcion } = req.body;
    try {
        const existePais = await PaisesModel.findOne({ descripcion });
        if (existePais) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un país con esa descripción.'
            });
        }
        const pais = new PaisesModel(req.body);
        await pais.save();
        res.status(201).json({
            ok: true,
            msg: 'País creado exitosamente',
            pais
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el país.'
        });
    }
};

const getPaises = async (req: Request, res: Response) => {
    try {
        const paises = await PaisesModel.find();
        res.status(200).json({
            ok: true,
            paises
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los países.'
        });
    }
};

const getPaisById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const pais = await PaisesModel.findById(id);
        if (!pais) {
            return res.status(404).json({
                ok: false,
                msg: 'País no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            pais
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el país.'
        });
    }
};

const actualizarPais = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nombre, ...campos } = req.body;
    try {
        const paisDB = await PaisesModel.findById(id);
        if (!paisDB) {
            return res.status(404).json({
                ok: false,
                msg: 'País no encontrado por ID.'
            });
        }
        if (nombre && nombre !== paisDB.nombre) {
            const existeDescripcion = await PaisesModel.findOne({ nombre });
            if (existeDescripcion) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un país con esa descripción.'
                });
            }
            campos.nombre = nombre;
        }
        const paisActualizado = await PaisesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'País actualizado exitosamente',
            pais: paisActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el país.'
        });
    }
};

const eliminarPais = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        // La eliminación de países podría necesitar lógica para evitar eliminar países con provincias asociadas.
        // Por ahora, implementamos eliminación física simple.
        const paisBorrado = await PaisesModel.findByIdAndDelete(id);
        if (!paisBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'País no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'País eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el país.'
        });
    }
};

export {
    crearPais,
    getPaises,
    getPaisById,
    actualizarPais,
    eliminarPais,
    seedPais
};