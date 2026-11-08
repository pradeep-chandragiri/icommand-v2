import bcrypt from 'bcryptjs';
import { createUserid } from '../../utils/userid.util.js';
import { createToken } from '../../utils/token.util.js';
import { userModel } from '../../models/users.model.js';

export const registerService = async (name, username, password) => {
    if (typeof name !== 'string' || 
        typeof username !== 'string' || 
        typeof password !== 'string' || 
        !name.trim() || 
        !username.trim() || 
        !password.trim()
    ) {
        const error = new Error('Invalid input. All fields are required.');
        error.statusCode = 400;
        throw error;
    }

    // data cleaning
    const cleanName = name.trim();
    const cleanUsername = username.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await userModel.findOne({ username: cleanUsername });
    if (existingUser) {
        const error = new Error('Username is already taken.');
        error.statusCode = 409;
        throw error
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    // userid creation
    const userid = createUserid();

    await userModel.create({
        _id: userid,
        username: cleanUsername,
        display_name: cleanName,
        password: hashedPassword
    });

    // token creation
    const token = createToken({ userid, cleanUsername });

    return {
        user: {
            userid: userid,
            display_name: cleanName,
            username: cleanUsername
        },
        token
    }

}

export const loginService = async (username, password) => {
    if (typeof username !== 'string' || 
        typeof password !== 'string' ||
        !username.trim() || 
        !password.trim()
    ) {
        const error = new Error('Invalid input. All fields are required.');
        error.statusCode = 400;
        throw error;
    }

    // data cleaning
    const cleanUsername = username.trim().toLowerCase();

    // Check if user exists
    const user = await userModel.findOne({ username: cleanUsername });

    // compare password
    const isMatch = user ? await bcrypt.compare(password, user.password) : false;
    if (!isMatch) {
        const error = new Error('Incorrect username or password.');
        error.statusCode = 401;
        throw error
    }

    // token creation
    const token = createToken({ userid: user._id, username: user.username });

    return {
        user: {
            userid: user._id,
            display_name: user.display_name,
            username: user.username
        },
        token
    }
}

export const getUserService = async (userid) => {

    const user = await userModel.findOne({ _id: userid }).select('-password');
    
    if (!user) {
        const error = new Error('User not found!');
        error.statusCode = 404;
        throw error;
    }

    return user

}

export const logoutService = async (userid) => {
    if (!userid) {
        const error = new Error('Invalid request. User session not found.');
        error.statusCode = 400;
        throw error
    }
}