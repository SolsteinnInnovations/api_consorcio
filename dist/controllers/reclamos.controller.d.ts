import { Request, Response } from 'express';
declare const crearReclamo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getReclamos: (req: Request, res: Response) => Promise<void>;
declare const getReclamoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarReclamo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarReclamo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearReclamo, getReclamos, getReclamoById, actualizarReclamo, eliminarReclamo };
