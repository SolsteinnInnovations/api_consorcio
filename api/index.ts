import app from '../src/app';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Exportamos Express como función para que Vercel lo use en modo serverless
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
