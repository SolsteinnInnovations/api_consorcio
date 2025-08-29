import { Request, Response } from 'express';
declare const crearTipoMovimiento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getTiposMovimientos: (req: Request, res: Response) => Promise<void>;
declare const getTipoMovimientoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarTipoMovimiento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarTipoMovimiento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearTipoMovimiento, getTiposMovimientos, getTipoMovimientoById, actualizarTipoMovimiento, eliminarTipoMovimiento };
