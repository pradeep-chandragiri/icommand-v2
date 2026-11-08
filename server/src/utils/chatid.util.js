import crypto from 'crypto';

export const createChatid = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let chatId = 'CHAT-';

    for (let i = 0; i < 5; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        chatId += chars[randomIndex];
    }

    return chatId;
}