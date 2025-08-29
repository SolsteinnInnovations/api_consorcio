import { Request, Response } from 'express';
declare const seedPais: (req: Request, res: Response) => Promise<void>;
declare const crearPais: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getPaises: (req: Request, res: Response) => Promise<void>;
declare const getPaisById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarPais: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarPais: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearPais, getPaises, getPaisById, actualizarPais, eliminarPais, seedPais };
