import { Request, Response } from 'express';
declare global {
    namespace Express {
        interface Request {
            user?: IUsuario;
        }
    }
}
import { IUsuario } from '../models/usuarios.model';
declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { register, login };
