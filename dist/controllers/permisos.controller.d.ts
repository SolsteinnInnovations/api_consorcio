import { Request, Response } from 'express';
declare const crearPermiso: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getPermisos: (req: Request, res: Response) => Promise<void>;
declare const getPermisoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarPermiso: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarPermiso: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearPermiso, getPermisos, getPermisoById, actualizarPermiso, eliminarPermiso };
