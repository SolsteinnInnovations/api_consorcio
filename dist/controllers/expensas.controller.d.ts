import { Request, Response } from 'express';
declare const crearExpensa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getExpensas: (req: Request, res: Response) => Promise<void>;
declare const getExpensaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarExpensa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarExpensa: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearExpensa, getExpensas, getExpensaById, actualizarExpensa, eliminarExpensa };
