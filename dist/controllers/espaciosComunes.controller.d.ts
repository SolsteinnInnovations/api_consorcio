import { Request, Response } from 'express';
declare const crearEspacioComun: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getEspaciosComunes: (req: Request, res: Response) => Promise<void>;
declare const getEspacioComunById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarEspacioComun: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarEspacioComun: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearEspacioComun, getEspaciosComunes, getEspacioComunById, actualizarEspacioComun, eliminarEspacioComun };
