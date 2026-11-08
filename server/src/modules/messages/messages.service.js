import { chatsModel } from '../../models/chats.model.js';
import { messagesModel } from '../../models/messages.model.js';
import { createMessageId } from '../../utils/messageId.util.js';

export const saveMessageService = async (userid, chatid, prompt) => {

    if (typeof prompt !== 'string' || !prompt.trim()) {
        const error = new Error('Prompt is required.');
        error.statusCode = 400;
        throw error;
    }

    const cleanPrompt = prompt.trim();

    // Verify chat exsistance
    const chat = await chatsModel.findOne({
        _id: chatid,
        userid
    });

    if (!chat) {
        const error = new Error('Chat not found or you do not have permission to access it.');
        error.statusCode = 404;
        throw error;
    }

    // Save user message
    const userMessage = await messagesModel.create({
        _id: createMessageId(),
        chatid,
        role: 'user',
        context: cleanPrompt
    });

    // Retrieve conversation history
    const history = await messagesModel.find({ chatid }).sort({ created_at: 1 }).select('role context -_id').lean();

    // Convert database fields to OpenRouter format
    const aiMessages = history.map(({ role, context }) => ({
        role,
        content: context
    }));

    // 6. Call OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openrouter/free',
                messages: aiMessages,
                stream: false,
                max_tokens: 200
            })
        }
    );

    // Handle API errors
    if (!response.ok) {
        const error = new Error('Failed to generate AI response.');
        error.statusCode = 502;
        throw error;
    }

    const result = await response.json();
    const aiContent = result.choices?.[0]?.message?.content;

    if (typeof aiContent !== 'string' || !aiContent.trim()) {
        // Rollback: delete the previously saved user message
        await messagesModel.deleteOne({
            _id: userMessage._id,
            chatid
        });

        const error = new Error('The AI returned an empty response.');
        error.statusCode = 502;
        throw error;
    }

    // Save AI response
    const aiMessage = await messagesModel.create({
        _id: createMessageId(),
        chatid,
        role: 'assistant',
        context: aiContent.trim()
    });

    // Return saved messages
    return {
        userMessage,
        aiMessage
    };
};