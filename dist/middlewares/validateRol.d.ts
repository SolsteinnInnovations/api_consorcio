import { Request, Response, NextFunction } from 'express';
import { IUsuario } from '../models/usuarios.model';
declare global {
    namespace Express {
        interface Request {
            usuario?: IUsuario;
        }
    }
}
export declare const validRole: (...rolesPermitidos: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
