import { Request, Response } from 'express';
declare const crearLocalidadBulk: (req: Request, res: Response) => Promise<void>;
declare const crearLocalidad: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getLocalidades: (req: Request, res: Response) => Promise<void>;
declare const getLocalidadById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarLocalidad: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarLocalidad: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearLocalidad, getLocalidades, getLocalidadById, actualizarLocalidad, eliminarLocalidad, crearLocalidadBulk };
