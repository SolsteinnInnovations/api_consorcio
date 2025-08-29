import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Extiende la interfaz Request para incluir 'user'
declare global {
    namespace Express {
        interface Request {
            user?: IUsuario;
        }
    }
}

// Actualiza la importación del modelo
import { UsuariosModel, IUsuario } from '../models/usuarios.model';
import { PerfilesModel } from '../models/perfiles.model'; // Necesitamos el modelo de Perfiles para validar
import { EdificiosModel } from '../models/edificios.model'; // Importa el modelo de Edificios


const register = async (req: Request, res: Response) => {
    const { email, password, idPerfil, idEdificio } = req.body;
    
    try {
        // Registra usuario
        // Verifica si el login ya existe
        const existeEmail = await UsuariosModel.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado.'
            });
        }

        // Verifica si el perfil existe
        const existePerfil = await PerfilesModel.findById(idPerfil);
        if (!existePerfil) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de perfil proporcionado no existe.'
            });
        }

        // Verifica si el edificio existe
        const existeEdificio = await EdificiosModel.findById(idEdificio);
        if (!existeEdificio) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID de edificio proporcionado no existe.'
            });
        }

        // Hashea la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crea el usuario
        const usuario = new UsuariosModel({
            email,
            password: hashedPassword,
            idPerfil,
            idEdificio // Guarda el idEdificio en el usuario
        });

        await usuario.save();   

        // registra la persona


        
        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado exitosamente',
            usuario: {
                id: usuario._id,
                email: usuario.email,
                idPerfil: usuario.idPerfil,
                idEdificio: usuario.idEdificio
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar el usuario.'
        });
    }
};

// --- Login de usuario ---
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario por login
        const usuario = await UsuariosModel.findOne({ email});
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas.'
            });
        }

        // Verifica si el usuario está habilitado
        if (usuario.habilitado === false) {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario deshabilitado.'
            });
        }

        // Compara la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password || '');
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas.'
            });
        }

        // Genera un JWT (cambia 'secret' por tu clave secreta real)
        const token = jwt.sign(
            { uid: usuario._id, email: usuario.email, idPerfil: usuario.idPerfil, idEdificio: usuario.idEdificio },
            process.env.JWT_SECRET! ,
            { expiresIn: '8h' }
        );

        
        res.status(200).json({
            ok: true,
            msg: 'Login exitoso',
            usuario: {
                id: usuario._id,
                email: usuario.email,
                idPerfil: usuario.idPerfil,
                idEdificio: usuario.idEdificio
            },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al hacer login.'
        });
        
    }
};


export {
    register,
    login
}