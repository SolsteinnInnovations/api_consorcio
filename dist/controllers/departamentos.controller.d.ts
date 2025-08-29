import { Request, Response } from 'express';
declare const crearDepartamento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getDepartamentos: (req: Request, res: Response) => Promise<void>;
declare const getDepartamentoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarDepartamento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarDepartamento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearDepartamento, getDepartamentos, getDepartamentoById, actualizarDepartamento, eliminarDepartamento };
