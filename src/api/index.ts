import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../app'; // Importa la instancia de app con todas las rutas y middlewares

export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any);
};
