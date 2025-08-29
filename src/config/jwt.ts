
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsuariosModel } from '../models/usuarios.model';


export const generateToken = (payload:JwtPayload) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET!,{ expiresIn: '1d' });
    return token

}

export const verifyToken =(payload:string) => {
    return jwt.verify(payload,process.env.JWT_SECRET!)
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);

    
    let user;
    if (typeof decoded === 'object' && 'uid' in decoded) {
      user = await UsuariosModel.findById((decoded as JwtPayload).uid).select('-password');
    } else {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid token user' });
    }

    req.user = user; 
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};