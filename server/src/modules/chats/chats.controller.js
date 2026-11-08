import { createChatService, deleteChatService, getAllChatsService, getChatService, searchChatsService, updateChatService } from './chats.service.js';


export const createChat = async (req, res, next) => {
    try {

        const userid = req.user.userid;
        const { title } = req.body;

        const chat = await createChatService(userid, title);

        return res.status(201).json({
            success: true,
            message: 'Chat created successfully.',
            data: chat
        });

    } catch (error) {
        next(error);
    }
}

export const updateChat = async (req, res, next) => {
    try {
        
        const userid = req.user.userid;
        const { chatid } = req.params;
        const { title } = req.body;

        const chat = await updateChatService(userid, chatid, title);

        return res.status(200).json({
            success: true,
            message: 'Chat updated successfully.',
            data: chat
        });

    } catch (error) {
        next(error);
    }
}

export const deleteChat = async (req, res, next) => {
    try {

        const userid = req.user.userid;
        const { chatid } = req.params;

        await deleteChatService(userid, chatid);

        return res.status(200).json({
            success: true,
            message: 'Chat deleted successfully.'
        });
        
    } catch (error) {
        next(error);
    }
}

export const getChat = async (req, res, next) => {
    try {
        
        const userid = req.user.userid;
        const { chatid } = req.params;

        const chat = await getChatService(userid, chatid);

        return res.status(200).json({
            success: true,
            message: 'Chat fetched successfully.',
            data: chat
        });

    } catch (error) {
        next(error);
    }
}

export const getAllChats = async (req, res, next) => {
    try {
        
        const userid = req.user.userid;

        const chats = await getAllChatsService(userid);

        return res.status(200).json({
            success: true,
            message: 'Your chats fetched successfully.',
            data: chats
        });

    } catch (error) {
        next(error);
    }
}

export const searchChats = async (req, res, next) => {
    try {
        
        const userid = req.user.userid;
        const { query } = req.query;

        const chats = await searchChatsService(userid, query);

        return res.status(200).json({
            success: true,
            message: 'Found chats successfully.',
            data: chats
        });

    } catch (error) {
        next(error);
    }
}