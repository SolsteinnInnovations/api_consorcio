"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seed_controller_1 = require("../controllers/seed.controller");
const usuarios_model_1 = require("../models/usuarios.model");
const edificios_model_1 = require("../models/edificios.model");
const perfiles_model_1 = require("../models/perfiles.model");
const permisos_model_1 = require("../models/permisos.model");
const perfilesPermisos_model_1 = require("../models/perfilesPermisos.model");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    console.log('iniciando SEED\n');
    try {
        // --------------------------------------------
        //Eliminamos el seed previo.
        console.log('-----------------------\n');
        console.log('Iniciando eliminado de seed previos');
        await usuarios_model_1.UsuariosModel.deleteMany({});
        console.log('Usuarios eliminados ok');
        await edificios_model_1.EdificiosModel.deleteMany({});
        console.log('Edificios eliminados ok');
        await perfilesPermisos_model_1.PerfilesPermisosModel.deleteMany({});
        console.log('Perfiles Permisos eliminados ok');
        await perfiles_model_1.PerfilesModel.deleteMany({});
        console.log('Perfiles eliminados ok');
        await permisos_model_1.PermisosModel.deleteMany({});
        console.log('Permisos eliminados ok');
        console.log('\n-----------------------\n');
        // --------------------------------------------
        // --------------------------------------------
        // Corremos los SEED
        // corremos el seed de permisos
        console.log('\n-----------------------\n');
        console.log('Iniciando seed de permisos');
        await (0, seed_controller_1.seedPermisos)();
        console.log('Permisos cargados ok');
        console.log('\n-----------------------\n');
        // corremos el seed de perfiles
        console.log('-----------------------\n');
        console.log('Iniciando seed de perfiles');
        await (0, seed_controller_1.seedPerfiles)();
        console.log('Perfiles cargados ok');
        console.log('\n-----------------------\n');
        // corremos el seed de PERMISOS - PERFILES
        console.log('-----------------------\n');
        console.log('Iniciando seed de PERMISOS PERFILES');
        await (0, seed_controller_1.seedPermisosPerfiles)();
        console.log('Perfiles cargados ok');
        console.log('\n-----------------------\n');
        // Corremos el seed de edificios
        console.log('-----------------------\n');
        console.log('Iniciando seed de edificios');
        await (0, seed_controller_1.seedEdificios)();
        console.log('Edificios cargados ok');
        console.log('\n-----------------------\n');
        // Corremos seed usuarios
        console.log('-----------------------\n');
        console.log('Iniciando seed de usuarios');
        await (0, seed_controller_1.seedUsuarios)();
        console.log('Usuarios cargados ok');
        console.log('\n-----------------------\n');
        res.status(201).json({
            msg: 'Seed ejecutado correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            error: ('ocurrio un error: ' + error)
        });
    }
});
exports.default = router;
//# sourceMappingURL=seed.routes.js.map