import { Request, Response } from 'express';
declare const crearHistoricoExpensa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getHistoricoExpensas: (req: Request, res: Response) => Promise<void>;
declare const getHistoricoExpensaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarHistoricoExpensa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarHistoricoExpensa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearHistoricoExpensa, getHistoricoExpensas, getHistoricoExpensaById, actualizarHistoricoExpensa, eliminarHistoricoExpensa };
