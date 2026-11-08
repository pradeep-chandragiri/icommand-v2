import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;
        if (!token) {
            const error = new Error('Authentication credentials were not provided or are invalid.');
            error.statusCode = 401;
            throw error
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();

    } catch (error) {
        error.statusCode = 401;
        error.message = 'Authentication credentials were not provided or are invalid.';
        next(error);
    }
}