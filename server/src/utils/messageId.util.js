import crypto from 'crypto';

export const createMessageId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let messageId = 'MSG-';

    for (let i = 0; i < 5; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        messageId += chars[randomIndex];
    }

    return messageId;
}