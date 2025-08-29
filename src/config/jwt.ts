
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const generateToken = (payload:JwtPayload) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET!,{ expiresIn: '1d' });
    return token

}

export const verifyToken =(payload:string) => {
    return jwt.verify(payload,process.env.JWT_SECRET!)
}


export const authenticateUser = (req: Request, res: Response, next: NextFunction) : void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return ;
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY!,{
            algorithms: ['HS256'],        
        });
        req.token = decoded.toString(); // Casting req to any to add user property
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};