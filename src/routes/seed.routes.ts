import { Router } from 'express';
import { seedEdificios, seedPerfiles, seedPermisos, seedPermisosPerfiles, seedUsuarios } from '../controllers/seed.controller';
import { UsuariosModel } from '../models/usuarios.model';
import { EdificiosModel } from '../models/edificios.model';
import { PerfilesModel } from '../models/perfiles.model';
import { PermisosModel } from '../models/permisos.model';
import { PerfilesPermisosModel } from '../models/perfilesPermisos.model';


const router = Router();

router.get('/', async (req, res) => {

    console.log('iniciando SEED\n');
    
    try {

        // --------------------------------------------
        //Eliminamos el seed previo.
        console.log('-----------------------\n')
        console.log('Iniciando eliminado de seed previos')
        await UsuariosModel.deleteMany({});
        console.log('Usuarios eliminados ok')

        await EdificiosModel.deleteMany({});
        console.log('Edificios eliminados ok')

        await PerfilesPermisosModel.deleteMany({})
        console.log('Perfiles Permisos eliminados ok')
        
        await PerfilesModel.deleteMany({});
        console.log('Perfiles eliminados ok')

        await PermisosModel.deleteMany({});
        console.log('Permisos eliminados ok')
        console.log('\n-----------------------\n')
        // --------------------------------------------

        // --------------------------------------------


        // Corremos los SEED
       
        // corremos el seed de permisos
        console.log('\n-----------------------\n')
        console.log('Iniciando seed de permisos')
        await seedPermisos();
        console.log('Permisos cargados ok')
        console.log('\n-----------------------\n')

        // corremos el seed de perfiles
        console.log('-----------------------\n')
        console.log('Iniciando seed de perfiles')
        await seedPerfiles()
        console.log('Perfiles cargados ok')
        console.log('\n-----------------------\n')

         // corremos el seed de PERMISOS - PERFILES
        console.log('-----------------------\n')
        console.log('Iniciando seed de PERMISOS PERFILES')
        await seedPermisosPerfiles()
        console.log('Perfiles cargados ok')
        console.log('\n-----------------------\n')

        // Corremos el seed de edificios
        console.log('-----------------------\n')
        console.log('Iniciando seed de edificios')
        await seedEdificios()
        console.log('Edificios cargados ok')
        console.log('\n-----------------------\n')

        // Corremos seed usuarios
        console.log('-----------------------\n')
        console.log('Iniciando seed de usuarios')
        await seedUsuarios()
        console.log('Usuarios cargados ok')
        console.log('\n-----------------------\n')

        res.status(201).json({
            msg:'Seed ejecutado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            error: ('ocurrio un error: ' + error)
        })
        
    }



});


export default router;