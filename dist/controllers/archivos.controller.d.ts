import { Request, Response } from 'express';
declare const crearArchivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getArchivos: (req: Request, res: Response) => Promise<void>;
declare const getArchivoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarArchivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarArchivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearArchivo, getArchivos, getArchivoById, actualizarArchivo, eliminarArchivo };
