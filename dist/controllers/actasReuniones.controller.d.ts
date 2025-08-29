import { Request, Response } from 'express';
declare const crearActaReunion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getActasReuniones: (req: Request, res: Response) => Promise<void>;
declare const getActaReunionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarActaReunion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarActaReunion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearActaReunion, getActasReuniones, getActaReunionById, actualizarActaReunion, eliminarActaReunion };
