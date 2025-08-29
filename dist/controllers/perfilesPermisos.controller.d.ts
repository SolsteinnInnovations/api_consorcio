import { Request, Response } from 'express';
declare const crearPerfilPermiso: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getPerfilesPermisos: (req: Request, res: Response) => Promise<void>;
declare const getPerfilPermisoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarPerfilPermiso: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarPerfilPermiso: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearPerfilPermiso, getPerfilesPermisos, getPerfilPermisoById, actualizarPerfilPermiso, eliminarPerfilPermiso };
