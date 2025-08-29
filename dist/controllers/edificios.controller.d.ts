import { Request, Response } from 'express';
declare const crearEdificio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getEdificios: (req: Request, res: Response) => Promise<void>;
declare const getEdificioById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarEdificio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarEdificio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearEdificio, getEdificios, getEdificioById, actualizarEdificio, eliminarEdificio };
