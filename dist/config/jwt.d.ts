import jwt, { JwtPayload } from 'jsonwebtoken';
export declare const generateToken: (payload: JwtPayload) => string;
export declare const verifyToken: (payload: string) => string | jwt.JwtPayload;
