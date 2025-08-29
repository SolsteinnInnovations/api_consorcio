import { Request, Response } from 'express';
declare const crearParametroConfiguracion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getParametrosConfiguracion: (req: Request, res: Response) => Promise<void>;
declare const getParametroConfiguracionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarParametroConfiguracion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarParametroConfiguracion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearParametroConfiguracion, getParametrosConfiguracion, getParametroConfiguracionById, actualizarParametroConfiguracion, eliminarParametroConfiguracion };
