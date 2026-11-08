import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    chatid: {
        type: String,
        required: true,
        ref: 'chats',
        index: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    context: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: Date.now,
        index: true
    }
}, { timestamps: false, id: false });

export const messagesModel = mongoose.models.messages || mongoose.model('messages', messageSchema);