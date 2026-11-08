import crypto from 'crypto';

export const createUserid = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let userid = '';

    for (let i = 0; i < 9; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        userid += chars[randomIndex];
    }

    return userid;
}