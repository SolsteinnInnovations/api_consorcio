import { Request, Response } from 'express';
declare const crearReclamoDepartamento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getReclamosDepartamentos: (req: Request, res: Response) => Promise<void>;
declare const getReclamoDepartamentoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarReclamoDepartamento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearReclamoDepartamento, getReclamosDepartamentos, getReclamoDepartamentoById, eliminarReclamoDepartamento };
