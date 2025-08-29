import  {Request,Response,NextFunction} from 'express';
import { IUsuario } from '../models/usuarios.model';

declare global{
    namespace Express{
    export interface Request{
        usuario?:IUsuario
        token?:string
    }
}
} 

export const validProfile = (...perfilesPermitidos:string[]) => {

    return(req:Request,res:Response,next:NextFunction) => {

        if( perfilesPermitidos.includes(req.usuario?.idPerfil?.toString()!)){
            return res.status(403).json({
                ok:false,
                msg:'No tiene permisos para realizar esta acción'
            });
        }

        next();
    }
}

