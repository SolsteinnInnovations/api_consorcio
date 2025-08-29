import { Request, Response } from 'express';
declare const crearTipoDocumento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getTiposDocumentos: (req: Request, res: Response) => Promise<void>;
declare const getTipoDocumentoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarTipoDocumento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarTipoDocumento: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearTipoDocumento, getTiposDocumentos, getTipoDocumentoById, actualizarTipoDocumento, eliminarTipoDocumento };
