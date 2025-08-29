"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarDepartamento = exports.actualizarDepartamento = exports.getDepartamentoById = exports.getDepartamentos = exports.crearDepartamento = void 0;
const departamentos_model_1 = require("../models/departamentos.model");
const personas_model_1 = require("../models/personas.model");
const edificios_model_1 = require("../models/edificios.model");
const crearDepartamento = async (req, res) => {
    const { identificacion, idEdificio, idPersona } = req.body;
    try {
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        const existeDepartamento = await departamentos_model_1.DepartamentosModel.findOne({ identificacion, idEdificio });
        if (existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un departamento con la identificación '${identificacion}' en este edificio.`
            });
        }
        if (idPersona) {
            const existePersona = await personas_model_1.PersonasModel.findById(idPersona);
            if (!existePersona) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El ID de persona proporcionado no existe.'
                });
            }
            const personaYaOcupa = await departamentos_model_1.DepartamentosModel.findOne({ idPersona });
            if (personaYaOcupa) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Esta persona ya está ocupando otro departamento.'
                });
            }
        }
        const departamento = new departamentos_model_1.DepartamentosModel(req.body);
        await departamento.save();
        res.status(201).json({
            ok: true,
            msg: 'Departamento creado exitosamente',
            departamento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el departamento.'
        });
    }
};
exports.crearDepartamento = crearDepartamento;
const getDepartamentos = async (req, res) => {
    try {
        const departamentos = await departamentos_model_1.DepartamentosModel.find()
            .populate('idPersona', 'nombres apellidos documento') // Trae datos de la persona si está ocupado
            .populate('idEdificio', 'direccion identificadorEdificio'); // Trae datos del edificio
        res.status(200).json({
            ok: true,
            departamentos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los departamentos.'
        });
    }
};
exports.getDepartamentos = getDepartamentos;
const getDepartamentoById = async (req, res) => {
    const id = req.params.id;
    try {
        const departamento = await departamentos_model_1.DepartamentosModel.findById(id)
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el departamento.'
        });
    }
};
exports.getDepartamentoById = getDepartamentoById;
const actualizarDepartamento = async (req, res) => {
    const id = req.params.id;
    const { identificacion, idEdificio, idPersona, ...campos } = req.body;
    try {
        const departamentoDB = await departamentos_model_1.DepartamentosModel.findById(id);
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
            const existeOtroDepartamento = await departamentos_model_1.DepartamentosModel.findOne({
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
            if (identificacion)
                campos.identificacion = identificacion;
            if (idEdificio) {
                const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
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
            }
            else { // Ocupar con una nueva persona
                const existePersona = await personas_model_1.PersonasModel.findById(idPersona);
                if (!existePersona) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El ID de persona proporcionado no existe.'
                    });
                }
                const personaYaOcupa = await departamentos_model_1.DepartamentosModel.findOne({ idPersona });
                if (personaYaOcupa && String(personaYaOcupa._id) !== id) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'Esta persona ya está ocupando otro departamento.'
                    });
                }
                campos.idPersona = idPersona;
                campos.ocupado = true;
            }
        }
        else if (idPersona === undefined && typeof req.body.ocupado === 'boolean') {
            // Si no se actualiza idPersona, pero se actualiza ocupado
            if (req.body.ocupado === false && departamentoDB.idPersona) {
                // Si lo marcan como desocupado, y tiene persona, desasociar
                campos.idPersona = null;
            }
            else if (req.body.ocupado === true && !departamentoDB.idPersona) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No se puede marcar como ocupado sin asignar una persona.'
                });
            }
        }
        const departamentoActualizado = await departamentos_model_1.DepartamentosModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Departamento actualizado exitosamente',
            departamento: departamentoActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el departamento.'
        });
    }
};
exports.actualizarDepartamento = actualizarDepartamento;
const eliminarDepartamento = async (req, res) => {
    const id = req.params.id;
    try {
        const departamentoBorrado = await departamentos_model_1.DepartamentosModel.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el departamento.'
        });
    }
};
exports.eliminarDepartamento = eliminarDepartamento;
//# sourceMappingURL=departamentos.controller.js.map