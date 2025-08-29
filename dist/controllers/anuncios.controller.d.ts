import { Request, Response } from "express";
declare const crearAnuncio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getAnuncios: (req: Request, res: Response) => Promise<void>;
declare const getAnuncioById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarAnuncio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarAnuncio: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearAnuncio, getAnuncios, getAnuncioById, actualizarAnuncio, eliminarAnuncio, };
