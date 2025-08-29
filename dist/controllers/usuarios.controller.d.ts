import { Request, Response } from 'express';
declare const crearUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getUsuarios: (req: Request, res: Response) => Promise<void>;
declare const getUsuarioById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearUsuario, getUsuarios, getUsuarioById, actualizarUsuario, eliminarUsuario, };
