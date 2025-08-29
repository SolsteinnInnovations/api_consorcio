import { Request, Response } from 'express';
declare const crearParticipanteReunion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getParticipantesReuniones: (req: Request, res: Response) => Promise<void>;
declare const getParticipanteReunionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarParticipanteReunion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearParticipanteReunion, getParticipantesReuniones, getParticipanteReunionById, eliminarParticipanteReunion };
