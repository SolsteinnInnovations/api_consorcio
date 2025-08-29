import { Request, Response } from 'express';
declare const crearEntidadAsociada: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getEntidadesAsociadas: (req: Request, res: Response) => Promise<void>;
declare const getEntidadAsociadaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarEntidadAsociada: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarEntidadAsociada: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearEntidadAsociada, getEntidadesAsociadas, getEntidadAsociadaById, actualizarEntidadAsociada, eliminarEntidadAsociada };
