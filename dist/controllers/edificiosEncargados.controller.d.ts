import { Request, Response } from 'express';
declare const crearEdificioEncargado: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getEdificiosEncargados: (req: Request, res: Response) => Promise<void>;
declare const getEdificioEncargadoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarEdificioEncargado: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearEdificioEncargado, getEdificiosEncargados, getEdificioEncargadoById, eliminarEdificioEncargado };
