import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
export declare const generateToken: (payload: JwtPayload) => string;
export declare const verifyToken: (payload: string) => string | jwt.JwtPayload;
export declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
