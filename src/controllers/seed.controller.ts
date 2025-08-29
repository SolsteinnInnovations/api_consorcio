import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUsuario, UsuariosModel } from '../models/usuarios.model';
import { PerfilesModel } from '../models/perfiles.model';
import { EdificiosModel, IEdificio } from '../models/edificios.model';
import { PermisosModel } from '../models/permisos.model';
import { IPerfilPermiso, PerfilesPermisosModel } from '../models/perfilesPermisos.model';

export interface IPerfil extends Document {
    descripcion: string;
    nombre: string;
    habilitado?: boolean;
}
export const seedPerfiles = async () => {
    const perfilesDescripcion = [
        'Administrador principal',
        'Propietario - residente',
        'Propietario - no residente',
        'Inquilino',
        'Representante / apoderado'
    ]
    const perfilesNombre = [
        'Administrador principal',
        'Propietario - residente',
        'Propietario - no residente',
        'Inquilino',
        'Representante / apoderado'
    ]
    const perfilesHabilitado = true
    const perfilesArray = []

    for (let i = 0; i < perfilesDescripcion.length; i++) {

        const descripcion = perfilesDescripcion[i];
        const nombre = perfilesNombre[i];
        const habilitado = perfilesHabilitado;
        perfilesArray.push({
            descripcion,
            nombre,

            habilitado
        })
    }

    await PerfilesModel.insertMany(perfilesArray);

}
export const seedPermisos = async () => {
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

        await PermisosModel.insertMany(permisosArray);

    } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        } else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }
};
export const seedPermisosPerfiles = async () => {
    try {

        const perfilesUsuarios = [
            await PerfilesModel.findOne({ nombre: 'Administrador principal' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Propietario - residente' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Propietario - no residente' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Inquilino' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Representante / apoderado' }).select('_id')
        ];

        // residente 1, 5, 6, 7, 8, 9, 12, 20
        const permisosUsuarios = [
            await PermisosModel.findOne({ descripcion: "Visualizar expensas" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Generar expensas" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Editar expensas" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Registrar pagos" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Crear reclamos" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Editar reclamos" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Resolver / cerrar reclamos" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Publicar anuncios" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Editar anuncios" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Eliminar anuncios" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Subir documentación" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Descargar documentación" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Eliminar documentación" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Gestionar residentes (crear, editar, eliminar)" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Gestionar administradores (crear, editar, eliminar)" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Configurar accesos y roles" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Acceder a reportes" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Configurar datos del consorcio" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Configurar módulos del sistema" }).select("_id"),
            await PermisosModel.findOne({ descripcion: "Acceder a mensajería interna" }).select("_id"),
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
        ]

        const permisosNoResidente = [
            permisosUsuarios[0], permisosUsuarios[4], permisosUsuarios[5], permisosUsuarios[6], permisosUsuarios[7], permisosUsuarios[8], permisosUsuarios[11]
        ]

        const permisosInquilino = [
            permisosUsuarios[0],permisosUsuarios[4],permisosUsuarios[5],permisosUsuarios[6],permisosUsuarios[7],permisosUsuarios[11],permisosUsuarios[19]
        ]

        const habilitado = true;

        const arrayPermisosPerfiles: Partial<IPerfilPermiso>[] = []

        // para el perfil administrador
        for (let i = 0; i < permisosUsuarios.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[0]?._id as mongoose.Types.ObjectId,
                idPermiso: permisosUsuarios[i]?._id as mongoose.Types.ObjectId,
                habilitado
            })
        }

        // Para el perfil Propietario – residente
        for (let i = 0; i < permisosResidente.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[1]?._id as mongoose.Types.ObjectId,
                idPermiso: permisosUsuarios[i]?._id as mongoose.Types.ObjectId,
                habilitado
            })
        }

        // Para el perfil Propietario – no residente 1, 5, 6, 7, 8, 9, 12 (opcional 20 si se habilita mensajería)
        for (let i = 0; i < permisosNoResidente.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[2]?._id as mongoose.Types.ObjectId,
                idPermiso: permisosUsuarios[i]?._id as mongoose.Types.ObjectId,
                habilitado
            })
        }

        // Para el perfil Inquilino
        for (let i = 0; i < permisosInquilino.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[3]?._id as mongoose.Types.ObjectId,
                idPermiso: permisosUsuarios[i]?._id as mongoose.Types.ObjectId,
                habilitado
            })
        }
        

        // Para el perfil representante legal, por ahora lo djeamos asi
         for (let i = 0; i < permisosInquilino.length; i++) {
            arrayPermisosPerfiles.push({
                idPerfil: perfilesUsuarios[4]?._id as mongoose.Types.ObjectId,
                idPermiso: permisosUsuarios[i]?._id as mongoose.Types.ObjectId,
                habilitado
            })
        }

        await PerfilesPermisosModel.insertMany(arrayPermisosPerfiles)


    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        } else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }


}
export const seedLocalidades = async () => {

    const nombre = ['Wilde', 'Cordoba', 'MICRO CENTRO'];
    const codigosPostales = ['1875', '5000', '1005'];
    const idProvincias = ['60c72b2f9b1e8c001c8e4d1a', '68a602439957d85e46ddb598', '68a602439957d85e46ddb594']; // buscar mongo id buenos aires, cordoba, buenos aires

}
export const seedEdificios = async () => {
    try {
        const direcciones = ['Emilio Zola 5716', 'Cordoba 1234', 'Florida 32'];
        const idLocalidades = ['68a6045d278352643862e1ad', '68a6045d278352643862e1af', '68a6045d278352643862e1ae']; // buscar mongo id wilde, cordoba la plata
        const identificacionesIdificios = ['EDIF0001', 'EDIF0002', 'EDIF0003'];
        const edificiosArray: Partial<IEdificio>[] = [];
        for (let i = 0; i < direcciones.length; i++) {

            const direccion = direcciones[i];
            const idLocalidad = new mongoose.Types.ObjectId(idLocalidades[i]);
            const identificadorEdificio = identificacionesIdificios[i];
            edificiosArray.push({
                direccion,
                idLocalidad,
                identificadorEdificio
            });
        }
        await EdificiosModel.insertMany(edificiosArray);
    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        } else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }

}

export const seedUsuarios = async () => {

    try {
        const usuarios = [
            'usuario.administrador1@gmail.com', 'usuario.propietario1@gmail.com', 'usuario.nopropietario1@gmail.com', 'usuario.inquilono1@gmail.com', 'usuario.apoderado1@gmail.com',
            'usuario.administrador2@gmail.com', 'usuario.propietario2@gmail.com', 'usuario.nopropietario2@gmail.com', 'usuario.inquilono2@gmail.com', 'usuario.apoderado2@gmail.com',
            'usuario.administrador3@gmail.com', 'usuario.propietario3@gmail.com', 'usuario.nopropietario3@gmail.com', 'usuario.inquilono3@gmail.com', 'usuario.apoderado3@gmail.com'
        ];
        const salt = await bcrypt.genSalt(10)
        const usersPassword = await bcrypt.hash('solsteinn',salt);
        const estado = true;
        const perfilesUsuarios = [
            await PerfilesModel.findOne({ nombre: 'Administrador principal' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Propietario - residente' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Propietario - no residente' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Inquilino' }).select('_id'),
            await PerfilesModel.findOne({ nombre: 'Representante / apoderado' }).select('_id')];
        const idEdificios = [
            await EdificiosModel.findOne({ identificadorEdificio: 'EDIF0001' }).select('_id'),
            await EdificiosModel.findOne({ identificadorEdificio: 'EDIF0002' }).select('_id'),
            await EdificiosModel.findOne({ identificadorEdificio: 'EDIF0003' }).select('_id'),

        ];

        const arrayUsuarios: Partial<IUsuario>[] = [];
        let userIndex = 0;
        for (let i = 0; i < idEdificios.length; i++) {

            for (let j = 0; j < perfilesUsuarios.length; j++) {
                const email = usuarios[userIndex];
                const password = usersPassword;
                const habilitado = estado;
                const idPerfil = perfilesUsuarios[j]?._id as mongoose.Types.ObjectId;
                const idEdificio = idEdificios[i]?._id as mongoose.Types.ObjectId;

                arrayUsuarios.push({
                    email,
                    password,
                    habilitado,
                    idPerfil,
                    idEdificio
                })
                userIndex++;
            }

        }

        await UsuariosModel.insertMany(arrayUsuarios)
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof Error) {
            throw new Error("Hubo un error en el sistema: " + error.message);
        } else {
            throw new Error("Hubo un error desconocido en el sistema");
        }
    }



}
