"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEspacioComun = exports.actualizarEspacioComun = exports.getEspacioComunById = exports.getEspaciosComunes = exports.crearEspacioComun = void 0;
const espaciosComunes_model_1 = require("../models/espaciosComunes.model");
const edificios_model_1 = require("../models/edificios.model");
const crearEspacioComun = async (req, res) => {
    const { identificacion, idEdificio } = req.body;
    try {
        const existeEdificio = await edificios_model_1.EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }
        const existeEspacio = await espaciosComunes_model_1.EspaciosComunesModel.findOne({ identificacion, idEdificio });
        if (existeEspacio) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un espacio común con la identificación '${identificacion}' en este edificio.`
            });
        }
        const espacioComun = new espaciosComunes_model_1.EspaciosComunesModel(req.body);
        await espacioComun.save();
        res.status(201).json({
            ok: true,
            msg: 'Espacio común creado exitosamente',
            espacioComun
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al crear el espacio común.'
        });
    }
};
exports.crearEspacioComun = crearEspacioComun;
const getEspaciosComunes = async (req, res) => {
    try {
        const espaciosComunes = await espaciosComunes_model_1.EspaciosComunesModel.find()
            .populate('idEdificio', 'direccion identificadorEdificio');
        res.status(200).json({
            ok: true,
            espaciosComunes
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener los espacios comunes.'
        });
    }
};
exports.getEspaciosComunes = getEspaciosComunes;
const getEspacioComunById = async (req, res) => {
    const id = req.params.id;
    try {
        const espacioComun = await espaciosComunes_model_1.EspaciosComunesModel.findById(id)
            .populate('idEdificio', 'direccion identificadorEdificio');
        if (!espacioComun) {
            return res.status(404).json({
                ok: false,
                msg: 'Espacio común no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            espacioComun
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al obtener el espacio común.'
        });
    }
};
exports.getEspacioComunById = getEspacioComunById;
const actualizarEspacioComun = async (req, res) => {
    const id = req.params.id;
    const { identificacion, idEdificio, ...campos } = req.body;
    try {
        const espacioComunDB = await espaciosComunes_model_1.EspaciosComunesModel.findById(id);
        if (!espacioComunDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Espacio común no encontrado por ID.'
            });
        }
        if ((identificacion && identificacion !== espacioComunDB.identificacion) ||
            (idEdificio && String(idEdificio) !== String(espacioComunDB.idEdificio))) {
            const nuevoIdentificacion = identificacion || espacioComunDB.identificacion;
            const nuevoIdEdificio = idEdificio || espacioComunDB.idEdificio;
            const existeOtroEspacio = await espaciosComunes_model_1.EspaciosComunesModel.findOne({
                identificacion: nuevoIdentificacion,
                idEdificio: nuevoIdEdificio,
                _id: { $ne: id }
            });
            if (existeOtroEspacio) {
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe un espacio común con la identificación '${nuevoIdentificacion}' en el edificio especificado.`
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
        const espacioComunActualizado = await espaciosComunes_model_1.EspaciosComunesModel.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Espacio común actualizado exitosamente',
            espacioComun: espacioComunActualizado
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al actualizar el espacio común.'
        });
    }
};
exports.actualizarEspacioComun = actualizarEspacioComun;
const eliminarEspacioComun = async (req, res) => {
    const id = req.params.id;
    try {
        const espacioComunBorrado = await espaciosComunes_model_1.EspaciosComunesModel.findByIdAndDelete(id);
        if (!espacioComunBorrado) {
            return res.status(404).json({
                ok: false,
                msg: 'Espacio común no encontrado por ID.'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Espacio común eliminado exitosamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador: error al eliminar el espacio común.'
        });
    }
};
exports.eliminarEspacioComun = eliminarEspacioComun;
