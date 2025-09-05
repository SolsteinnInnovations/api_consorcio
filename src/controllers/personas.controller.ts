import { Request, Response } from 'express';
import { PersonasModel, IPersona } from '../models/personas.model';
import { TipoDocumentosModel } from '../models/tipoDocumentos.model';
import { LocalidadesModel } from '../models/localidades.model';
import { UsuariosModel } from '../models/usuarios.model'; // Para validar idUsuario

const crearPersona = async (req: Request, res: Response) => {
    const { correoElectronico, documento, idTipoDocumento, idLocalidad, idUsuario } = req.body;
    try {
        if (correoElectronico) {
            const existeEmail = await PersonasModel.findOne({ correoElectronico });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una persona con ese correo electrónico.'
                });
            }
        }

        const existeDocumento = await PersonasModel.findOne({ documento });
        if (existeDocumento) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una persona con ese número de documento.'
            });
        }

        // const existeTipoDocumento = await TipoDocumentosModel.findById(idTipoDocumento);
        // if (!existeTipoDocumento) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'El ID de tipo de documento proporcionado no existe.'
        //     });
        // }

        if (idLocalidad) {
            const existeLocalidad = await LocalidadesModel.findById(idLocalidad);
            if (!existeLocalidad) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de localidad proporcionado no existe'
                });
            }
        }

        if (idUsuario) {

            const existeUsuario = await UsuariosModel.findById(idUsuario);
            if (!existeUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de usuario proporcionado no existe.'
                });
            }

            const usuarioYaAsociado = await PersonasModel.findOne({ idUsuario });
            if (usuarioYaAsociado) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este usuario ya está asociado a otra persona.'
                });
            }
        }

        const persona = new PersonasModel(req.body);
        await persona.save();

        res.status(201).json({
            ok: true,
            msg: 'Persona creada exitosamente',
            persona
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear la persona.'
        });
    }
};

const getPersonas = async (req: Request, res: Response) => {
    try {
        const personas = await PersonasModel.find()
            .populate('idTipoDocumento', 'descripcion')
            .populate({
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
            })
            .populate('idUsuario', 'usuario'); // Puedes seleccionar los campos del usuario que necesites
        res.status(200).json({
            ok: true,
            personas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener las personas.'
        });
    }
};

const getPersonaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const persona = await PersonasModel.findById(id)
            .populate('idTipoDocumento', 'descripcion')
            .populate({
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
            })
            .populate('idUsuario', 'usuario');
        if (!persona) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            persona
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener la persona.'
        });
    }
};

const actualizarPersona = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { correoElectronico, documento, idTipoDocumento, idLocalidad, idUsuario, ...campos } = req.body;
    try {
        const personaDB = await PersonasModel.findById(id);
        if (!personaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada por ID.'
            });
        }

        if (correoElectronico && correoElectronico !== personaDB.correoElectronico) {
            const existeEmail = await PersonasModel.findOne({ correoElectronico });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una persona con ese correo electrónico.'
                });
            }
            campos.correoElectronico = correoElectronico;
        }

        if (documento && documento !== personaDB.documento) {
            const existeDocumento = await PersonasModel.findOne({ documento });
            if (existeDocumento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una persona con ese número de documento.'
                });
            }
            campos.documento = documento;
        }

        if (idTipoDocumento && String(idTipoDocumento) !== String(personaDB.idTipoDocumento)) {
            const existeTipoDocumento = await TipoDocumentosModel.findById(idTipoDocumento);
            if (!existeTipoDocumento) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de tipo de documento proporcionado no existe.'
                });
            }
            campos.idTipoDocumento = idTipoDocumento;
        }

        if (idLocalidad && String(idLocalidad) !== String(personaDB.idLocalidad)) {
            const existeLocalidad = await LocalidadesModel.findById(idLocalidad);
            if (!existeLocalidad) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de localidad proporcionado no existe.'
                });
            }
            campos.idLocalidad = idLocalidad;
        }

        if (idUsuario && String(idUsuario) !== String(personaDB.idUsuario)) {
            const existeUsuario = await UsuariosModel.findById(idUsuario);
            if (!existeUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de usuario proporcionado no existe.'
                });
            }
            const usuarioYaAsociado = await PersonasModel.findOne({ idUsuario });
            if (usuarioYaAsociado && String(usuarioYaAsociado._id) !== id) { // Asegura que no sea la misma persona
                return res.status(400).json({
                    ok: false,
                    msg: 'Este usuario ya está asociado a otra persona.'
                });
            }
            campos.idUsuario = idUsuario;
        } else if (idUsuario === null) { // Si se envía null para desasociar el usuario
            campos.idUsuario = null;
        }


        const personaActualizada = await PersonasModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Persona actualizada exitosamente',
            persona: personaActualizada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar la persona.'
        });
    }
};

const eliminarPersona = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const personaBorrada = await PersonasModel.findByIdAndDelete(id);
        if (!personaBorrada) {
            return res.status(404).json({
                ok: false,
                msg: 'Persona no encontrada por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Persona eliminada exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar la persona.'
        });
    }
};

export {
    crearPersona,
    getPersonas,
    getPersonaById,
    actualizarPersona,
    eliminarPersona
};