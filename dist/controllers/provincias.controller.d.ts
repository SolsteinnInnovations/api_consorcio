import { Request, Response } from 'express';
declare const bulkCrearProvincia: (req: Request, res: Response) => Promise<void>;
declare const crearProvincia: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getProvincias: (req: Request, res: Response) => Promise<void>;
declare const getProvinciaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarProvincia: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarProvincia: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearProvincia, getProvincias, getProvinciaById, actualizarProvincia, eliminarProvincia, bulkCrearProvincia };
