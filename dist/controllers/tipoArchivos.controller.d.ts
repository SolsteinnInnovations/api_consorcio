import { Request, Response } from 'express';
declare const crearTipoArchivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getTiposArchivos: (req: Request, res: Response) => Promise<void>;
declare const getTipoArchivoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarTipoArchivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarTipoArchivo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearTipoArchivo, getTiposArchivos, getTipoArchivoById, actualizarTipoArchivo, eliminarTipoArchivo };
