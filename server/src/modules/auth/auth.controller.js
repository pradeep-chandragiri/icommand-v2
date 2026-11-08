import { getUserService, loginService, logoutService, registerService } from './auth.service.js';

export const register = async (req, res, next) => {
    try {
        
        const { name, username, password } = req.body;

        const user = await registerService(name, username, password);

        res.cookie('token', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        return res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            data: user
        });

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        
        const { username, password } = req.body;

        const user = await loginService(username, password);

        res.cookie('token', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3 * 24 * 60 * 60 * 1000,
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: 'Loggedin successfully.',
            data: user
        });

    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    
    try {
        
        const userid = req.user.userid;
        const user = await getUserService(userid);

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user
        });

    } catch (error) {
        next(error);
    }

}

export const logout = async (req, res, next) => {
    try {
        
        const userid = req.user.userid;

        await logoutService(userid);

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully.'
        });

    } catch (error) {
        next(error);
    }
}