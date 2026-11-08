import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
    
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || '3d'
    });

    return token;
}