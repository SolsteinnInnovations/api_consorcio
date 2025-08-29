import { Request, Response } from 'express';
declare const crearPersona: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getPersonas: (req: Request, res: Response) => Promise<void>;
declare const getPersonaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarPersona: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarPersona: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearPersona, getPersonas, getPersonaById, actualizarPersona, eliminarPersona };
