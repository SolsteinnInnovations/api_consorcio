import { Request, Response } from 'express';
import { DepartamentosModel, IDepartamento } from '../models/departamentos.model';
import { PersonasModel } from '../models/personas.model';
import { EdificiosModel } from '../models/edificios.model';

const crearDepartamento = async (req: Request, res: Response) => {
    const { identificacion, idEdificio, idPersona } = req.body;
    try {
        const existeEdificio = await EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }

        const existeDepartamento = await DepartamentosModel.findOne({ identificacion, idEdificio });
        if (existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un departamento con la identificación '${identificacion}' en este edificio.`
            });
        }

        if (idPersona) {
            const existePersona = await PersonasModel.findById(idPersona);
            if (!existePersona) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de persona proporcionado no existe.'
                });
            }
            const personaYaOcupa = await DepartamentosModel.findOne({ idPersona });
            if (personaYaOcupa) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Esta persona ya está ocupando otro departamento.'
                });
            }
        }

        const departamento = new DepartamentosModel(req.body);
        await departamento.save();
        res.status(201).json({
            ok: true,
            msg: 'Departamento creado exitosamente',
            departamento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el departamento.'
        });
    }
};

const getDepartamentos = async (req: Request, res: Response) => {
    try {
        const departamentos = await DepartamentosModel.find()
            .populate('idPersona', 'nombres apellidos documento') // Trae datos de la persona si está ocupado
            .populate('idEdificio', 'direccion identificadorEdificio'); // Trae datos del edificio
        res.status(200).json({
            ok: true,
            departamentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los departamentos.'
        });
    }
};

const getDepartamentoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const departamento = await DepartamentosModel.findById(id)
            .populate('idPersona', 'nombres apellidos documento')
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!departamento) {
            return res.status(404).json({
                ok: false,
                msg: 'Departamento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            departamento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el departamento.'
        });
    }
};

const actualizarDepartamento = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { identificacion, idEdificio, idPersona, ...campos } = req.body;
    try {
        const departamentoDB = await DepartamentosModel.findById(id);
        if (!departamentoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Departamento no encontrado por ID.'
            });
        }

        // Si se cambia la identificación o el edificio, verificar unicidad
        if ((identificacion && identificacion !== departamentoDB.identificacion) ||
            (idEdificio && String(idEdificio) !== String(departamentoDB.idEdificio))) {
            const nuevoIdentificacion = identificacion || departamentoDB.identificacion;
            const nuevoIdEdificio = idEdificio || departamentoDB.idEdificio;

            const existeOtroDepartamento = await DepartamentosModel.findOne({
                identificacion: nuevoIdentificacion,
                idEdificio: nuevoIdEdificio,
                _id: { $ne: id } // Excluir el propio documento actual
            });

            if (existeOtroDepartamento) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe un departamento con la identificación '${nuevoIdentificacion}' en el edificio especificado.`
                });
            }
            if (identificacion) campos.identificacion = identificacion;
            if (idEdificio) {
                const existeEdificio = await EdificiosModel.findById(idEdificio);
                if (!existeEdificio) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de edificio proporcionado no existe.'
                    });
                }
                campos.idEdificio = idEdificio;
            }
        }

        // Manejar cambios en idPersona
        if (idPersona !== undefined && String(idPersona) !== String(departamentoDB.idPersona)) {
            if (idPersona === null) { // Desocupar el departamento
                campos.idPersona = null;
                campos.ocupado = false;
            } else { // Ocupar con una nueva persona
                const existePersona = await PersonasModel.findById(idPersona);
                if (!existePersona) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de persona proporcionado no existe.'
                    });
                }
                const personaYaOcupa = await DepartamentosModel.findOne({ idPersona });
                if (personaYaOcupa && String(personaYaOcupa._id) !== id) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Esta persona ya está ocupando otro departamento.'
                    });
                }
                campos.idPersona = idPersona;
                campos.ocupado = true;
            }
        } else if (idPersona === undefined && typeof req.body.ocupado === 'boolean') {
            // Si no se actualiza idPersona, pero se actualiza ocupado
            if (req.body.ocupado === false && departamentoDB.idPersona) {
                // Si lo marcan como desocupado, y tiene persona, desasociar
                campos.idPersona = null;
            } else if (req.body.ocupado === true && !departamentoDB.idPersona) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No se puede marcar como ocupado sin asignar una persona.'
                });
            }
        }


        const departamentoActualizado = await DepartamentosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Departamento actualizado exitosamente',
            departamento: departamentoActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el departamento.'
        });
    }
};

const eliminarDepartamento = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const departamentoBorrado = await DepartamentosModel.findByIdAndDelete(id);
        if (!departamentoBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Departamento no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Departamento eliminado exitosamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el departamento.'
        });
    }
};

export {
    crearDepartamento,
    getDepartamentos,
    getDepartamentoById,
    actualizarDepartamento,
    eliminarDepartamento
};