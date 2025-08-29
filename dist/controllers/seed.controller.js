"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsuarios = exports.seedEdificios = exports.seedLocalidades = exports.seedPermisosPerfiles = exports.seedPermisos = exports.seedPerfiles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarios_model_1 = require("../models/usuarios.model");
const perfiles_model_1 = require("../models/perfiles.model");
const edificios_model_1 = require("../models/edificios.model");
const permisos_model_1 = require("../models/permisos.model");
const perfilesPermisos_model_1 = require("../models/perfilesPermisos.model");
const seedPerfiles = async () => {
    const perfilesDescripcion = [
        'Administrador principal',
        'Propietario - residente',
        'Propietario - no residente',
        'Inquilino',
        'Representante / apoderado'
    ];
    const perfilesNombre = [
        'Administrador principal',
        'Propietario - residente',
        'Propietario - no residente',
        'Inquilino',
        'Representante / apoderado'
    ];
    const perfilesHabilitado = true;
    const perfilesArray = [];
    for (let i = 0; i < perfilesDescripcion.length; i++) {
        const descripcion = perfilesDescripcion[i];
        const nombre = perfilesNombre[i];
        const habilitado = perfilesHabilitado;
        perfilesArray.push({
            descripcion,
            nombre,
            habilitado
        });
    }
    await perfiles_model_1.PerfilesModel.insertMany(perfilesArray);
};
exports.seedPerfiles = seedPerfiles;
const seedPermisos = async () => {
    try {
        const permisosDescripcion = [
            "Visualizar expensas",
            "Generar expensas",
            "Editar expensas",
            "Registrar pagos",
            "Crear reclamos",
            "Editar reclamos",
            "Resolver / cerrar reclamos",
            "Publicar anuncios",
            "Editar anuncios",
            "Eliminar anuncios",
            "Subir documentación",
            "Descargar documentación",
            "Eliminar documentación",
            "Gestionar residentes (crear, editar, eliminar)",
            "Gestionar administradores (crear, editar, eliminar)",
            "Configurar accesos y roles",
            "Acceder a reportes",
            "Configurar datos del consorcio",
            "Configurar módulos del sistema",
            "Acceder a mensajería interna"
        ];
        const permisosArray = permisosDescripcion.map((descripcion) => ({
            descripcion
        }));
        await permisos_model_1.PermisosModel.insertMany(permisosArray);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        }
        else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }
};
exports.seedPermisos = seedPermisos;
const seedPermisosPerfiles = async () => {
    try {
        const perfilesUsuarios = [
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Administrador principal' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Propietario - residente' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Propietario - no residente' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Inquilino' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Representante / apoderado' }).select('_id')
        ];
        // residente 1, 5, 6, 7, 8, 9, 12, 20
        const permisosUsuarios = [
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Visualizar expensas" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Generar expensas" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Editar expensas" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Registrar pagos" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Crear reclamos" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Editar reclamos" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Resolver / cerrar reclamos" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Publicar anuncios" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Editar anuncios" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Eliminar anuncios" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Subir documentación" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Descargar documentación" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Eliminar documentación" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Gestionar residentes (crear, editar, eliminar)" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Gestionar administradores (crear, editar, eliminar)" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Configurar accesos y roles" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Acceder a reportes" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Configurar datos del consorcio" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Configurar módulos del sistema" }).select("_id"),
            await permisos_model_1.PermisosModel.findOne({ descripcion: "Acceder a mensajería interna" }).select("_id"),
        ];
        const permisosResidente = [
            permisosUsuarios[0],
            permisosUsuarios[4],
            permisosUsuarios[5],
            permisosUsuarios[6],
            permisosUsuarios[7],
            permisosUsuarios[8],
            permisosUsuarios[11],
            permisosUsuarios[19]
        ];
        const permisosNoResidente = [
            permisosUsuarios[0], permisosUsuarios[4], permisosUsuarios[5], permisosUsuarios[6], permisosUsuarios[7], permisosUsuarios[8], permisosUsuarios[11]
        ];
        const permisosInquilino = [
            permisosUsuarios[0], permisosUsuarios[4], permisosUsuarios[5], permisosUsuarios[6], permisosUsuarios[7], permisosUsuarios[11], permisosUsuarios[19]
        ];
        const habilitado = true;
        const arrayPermisosPerfiles = [];
        // para el perfil administrador
        for (let i = 0; i < permisosUsuarios.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[0]?._id,
                idPermiso: permisosUsuarios[i]?._id,
                habilitado
            });
        }
        // Para el perfil Propietario – residente
        for (let i = 0; i < permisosResidente.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[1]?._id,
                idPermiso: permisosUsuarios[i]?._id,
                habilitado
            });
        }
        // Para el perfil Propietario – no residente 1, 5, 6, 7, 8, 9, 12 (opcional 20 si se habilita mensajería)
        for (let i = 0; i < permisosNoResidente.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[2]?._id,
                idPermiso: permisosUsuarios[i]?._id,
                habilitado
            });
        }
        // Para el perfil Inquilino
        for (let i = 0; i < permisosInquilino.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[3]?._id,
                idPermiso: permisosUsuarios[i]?._id,
                habilitado
            });
        }
        // Para el perfil representante legal, por ahora lo djeamos asi
        for (let i = 0; i < permisosInquilino.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[4]?._id,
                idPermiso: permisosUsuarios[i]?._id,
                habilitado
            });
        }
        await perfilesPermisos_model_1.PerfilesPermisosModel.insertMany(arrayPermisosPerfiles);
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        }
        else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }
};
exports.seedPermisosPerfiles = seedPermisosPerfiles;
const seedLocalidades = async () => {
    const nombre = ['Wilde', 'Cordoba', 'MICRO CENTRO'];
    const codigosPostales = ['1875', '5000', '1005'];
    const idProvincias = ['60c72b2f9b1e8c001c8e4d1a', '68a602439957d85e46ddb598', '68a602439957d85e46ddb594']; // buscar mongo id buenos aires, cordoba, buenos aires
};
exports.seedLocalidades = seedLocalidades;
const seedEdificios = async () => {
    try {
        const direcciones = ['Emilio Zola 5716', 'Cordoba 1234', 'Florida 32'];
        const idLocalidades = ['68a6045d278352643862e1ad', '68a6045d278352643862e1af', '68a6045d278352643862e1ae']; // buscar mongo id wilde, cordoba la plata
        const identificacionesIdificios = ['EDIF0001', 'EDIF0002', 'EDIF0003'];
        const edificiosArray = [];
        for (let i = 0; i < direcciones.length; i++) {
            const direccion = direcciones[i];
            const idLocalidad = new mongoose_1.default.Types.ObjectId(idLocalidades[i]);
            const identificadorEdificio = identificacionesIdificios[i];
            edificiosArray.push({
                direccion,
                idLocalidad,
                identificadorEdificio
            });
        }
        await edificios_model_1.EdificiosModel.insertMany(edificiosArray);
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        }
        else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }
};
exports.seedEdificios = seedEdificios;
const seedUsuarios = async () => {
    try {
        const usuarios = [
            'usuario.administrador1@gmail.com', 'usuario.propietario1@gmail.com', 'usuario.nopropietario1@gmail.com', 'usuario.inquilono1@gmail.com', 'usuario.apoderado1@gmail.com',
            'usuario.administrador2@gmail.com', 'usuario.propietario2@gmail.com', 'usuario.nopropietario2@gmail.com', 'usuario.inquilono2@gmail.com', 'usuario.apoderado2@gmail.com',
            'usuario.administrador3@gmail.com', 'usuario.propietario3@gmail.com', 'usuario.nopropietario3@gmail.com', 'usuario.inquilono3@gmail.com', 'usuario.apoderado3@gmail.com'
        ];
        const salt = await bcryptjs_1.default.genSalt(10);
        const usersPassword = await bcryptjs_1.default.hash('solsteinn', salt);
        const estado = true;
        const perfilesUsuarios = [
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Administrador principal' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Propietario - residente' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Propietario - no residente' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Inquilino' }).select('_id'),
            await perfiles_model_1.PerfilesModel.findOne({ nombre: 'Representante / apoderado' }).select('_id')
        ];
        const idEdificios = [
            await edificios_model_1.EdificiosModel.findOne({ identificadorEdificio: 'EDIF0001' }).select('_id'),
            await edificios_model_1.EdificiosModel.findOne({ identificadorEdificio: 'EDIF0002' }).select('_id'),
            await edificios_model_1.EdificiosModel.findOne({ identificadorEdificio: 'EDIF0003' }).select('_id'),
        ];
        const arrayUsuarios = [];
        let userIndex = 0;
        for (let i = 0; i < idEdificios.length; i++) {
            for (let j = 0; j < perfilesUsuarios.length; j++) {
                const email = usuarios[userIndex];
                const password = usersPassword;
                const habilitado = estado;
                const idPerfil = perfilesUsuarios[j]?._id;
                const idEdificio = idEdificios[i]?._id;
                arrayUsuarios.push({
                    email,
                    password,
                    habilitado,
                    idPerfil,
                    idEdificio
                });
                userIndex++;
            }
        }
        await usuarios_model_1.UsuariosModel.insertMany(arrayUsuarios);
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        }
        else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }
};
exports.seedUsuarios = seedUsuarios;
//# sourceMappingURL=seed.controller.js.map