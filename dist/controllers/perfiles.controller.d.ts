import { Request, Response } from 'express';
declare const crearPerfil: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getPerfiles: (req: Request, res: Response) => Promise<void>;
declare const getPerfilById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarPerfil: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarPerfil: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearPerfil, getPerfiles, getPerfilById, actualizarPerfil, eliminarPerfil };
