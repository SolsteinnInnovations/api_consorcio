import { Request, Response } from 'express';
declare const crearReserva: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getReservas: (req: Request, res: Response) => Promise<void>;
declare const getReservaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarReserva: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarReserva: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearReserva, getReservas, getReservaById, actualizarReserva, eliminarReserva };
