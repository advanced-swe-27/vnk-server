/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserRoles } from '../types';

export const APPNAME = "Starlit Child Ghana"

export const createError = (code: number, message: string) => {
    const error = new Error() as any;
    error.success = false;
    error.message = message;
    error.statusCode = code;
    return error;
}

export const encryptPassword = async (password: string) => {
    try {
        if (!password || password === '') throw new Error('Password is required');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: any, type: string) => {
    // create access token
    const accessToken = jwt.sign(
        { _id: user._id, email: user.email, type, blocked: user.blocked },
        process.env.JWT_ACCESS_SECRET || '',
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION || '1d',
        },
    );

    //   create refresh token
    const refreshToken = jwt.sign(
        { _id: user._id, email: user.email, type, blocked: user.blocked },
        process.env.JWT_REFRESH_SECRET || '',
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
        },
    );
    return { accessToken, refreshToken };
};

export const verifyToken = async (token: string, type: 'access' | 'refresh'): Promise<string | JwtPayload> => {
    const secret = type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
    return jwt.verify(token, secret || '');
};


export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return formattedDate;
};
  
