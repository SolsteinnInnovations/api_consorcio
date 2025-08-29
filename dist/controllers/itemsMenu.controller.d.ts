import { Request, Response } from 'express';
declare const crearItemMenu: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const getItemsMenu: (req: Request, res: Response) => Promise<void>;
declare const getItemMenuById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const actualizarItemMenu: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const eliminarItemMenu: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { crearItemMenu, getItemsMenu, getItemMenuById, actualizarItemMenu, eliminarItemMenu };
