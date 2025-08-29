import { Request, Response } from 'express';
declare const crearCajaMovimiento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getCajaMovimientos: (req: Request, res: Response) => Promise<void>;
declare const getCajaMovimientoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarCajaMovimiento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarCajaMovimiento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getSaldoCajaByEdificio: (req: Request, res: Response) => Promise<void>;
export { crearCajaMovimiento, getCajaMovimientos, getCajaMovimientoById, actualizarCajaMovimiento, eliminarCajaMovimiento, getSaldoCajaByEdificio };
