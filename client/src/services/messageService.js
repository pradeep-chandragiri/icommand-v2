import api from './api.js'

export const sendMessage = async (chatid, prompt) => {
    const response = await api.post(
        `/api/messages/${chatid}/messages`,
        { prompt }
    );

    return response.data;
};