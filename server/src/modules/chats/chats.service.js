import { chatsModel } from '../../models/chats.model.js';
import { messagesModel } from '../../models/messages.model.js';
import { createChatid } from '../../utils/chatid.util.js';


export const createChatService = async (userid, title) => {

    if (typeof title !== 'string' || !title.trim()) {
        const error = new Error('Title is required and must be a valid string.');
        error.statusCode = 400;
        throw error
    }

    // data cleaning
    const cleanTitle = title.trim();

    // data restriction
    if (cleanTitle.length > 50) {
        const error = new Error('Title is too long. Maximum allowed length is 50 characters.');
        error.statusCode = 400;
        throw error
    }

    // chatid creation
    const chatId = `${createChatid()}-${createChatid()}-${createChatid()}`;

    // saving to db
    await chatsModel.create({
        _id: chatId,
        userid: userid,
        title: cleanTitle
    });

    return {
        chat: {
            userid: userid,
            chatId: chatId,
            title: cleanTitle
        }
    }

}

export const updateChatService = async (userid, chatid, title) => {

    if (typeof title !== 'string' || !title.trim()) {
        const error = new Error('Title is required and must be a valid string.');
        error.statusCode = 400;
        throw error
    }

    if (!chatid) {
        const error = new Error('Chat ID is required.');
        error.statusCode = 400;
        throw error
    }

    // checking whether the chat exists or not
    const chat = await chatsModel.findOne({ _id: chatid, userid });
    if (!chat) {
        const error = new Error('Chat not found or you do not have permission to access it.');
        error.statusCode = 404;
        throw error
    }

    // data cleaning
    const cleanTitle = title.trim();

    // data restriction
    if (cleanTitle.length > 50) {
        const error = new Error('Title is too long. Maximum allowed length is 50 characters.');
        error.statusCode = 400;
        throw error
    }

    // updating chat
    const updatedChat = await chatsModel.findOneAndUpdate(
        { _id: chatid, userid: userid}, 
        { title: cleanTitle },
        { new: true, runValidators: true }
    );

    return {
        chat: updatedChat
    }

}

export const deleteChatService = async (userid, chatid) => {

    if (!chatid) {
        const error = new Error('Chat ID is required.');
        error.statusCode = 400;
        throw error;
    }

    const chat = await chatsModel.findOne({
        _id: chatid,
        userid
    });

    if (!chat) {
        const error = new Error('Chat not found or you do not have permission to delete it.');
        error.statusCode = 404;
        throw error;
    }

    // Delete all messages associated with this chat
    await messagesModel.deleteMany({ chatid });

    // Delete the chat
    await chatsModel.deleteOne({
        _id: chatid,
        userid
    });

    return { chatid };
};

export const getChatService = async (userid, chatid) => {

    if (!chatid) {
        const error = new Error('Chat ID is required.');
        error.statusCode = 400;
        throw error
    }

    // fetching
    const chat = await chatsModel.findOne({ _id: chatid, userid });

    if (!chat) {
        const error = new Error('Chat not found or you do not have permission to view it.');
        error.statusCode = 404;
        throw error;
    }

    // Fetch all messages belonging to this chat
    const messages = await messagesModel
        .find({ chatid })
        .sort({ created_at: 1 });

    return {
        chat,
        messages
    };
}

export const getAllChatsService = async (userid) => {
    const chats = await chatsModel.find({ userid }).sort({ created_at: -1 });
    return { chats };
}

export const searchChatsService = async (userid, query) => {
    if (typeof query !== 'string' || !query.trim()) {
        const error = new Error('Search term is required and must be a valid string.');
        error.statusCode = 400;
        throw error;
    }

    const cleanQuery = query.trim();

    const chats = await chatsModel.find({
        userid,
        title: { $regex: cleanQuery, $options: 'i' }
    }).sort({ created_at: -1 });

    return { chats };
}