import api from './api.js'

export const createChat = async (chatTitle) => {
    const response = await api.post('/api/chats/create', { title: chatTitle });
    return response.data;
}

export const getAllChats = async () => {
    const response = await api.get('/api/chats/');
    return response.data;
}

export const getChat = async (chatid) => {
    const response = await api.get(`/api/chats/${chatid}`);
    return response.data;
}

export const deleteChat = async (chatid) => {
    const response = await api.delete(`/api/chats/${chatid}`);
    return response.data;
}