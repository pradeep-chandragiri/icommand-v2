import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true,
        ref: 'users',
        index: true
    },
    title: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now,
        index: true
    }
}, { timestamps: false, id: false });

// Text index on the title field
chatSchema.index({ title: 'text' });

chatSchema.pre('save', function () {
    this.updated_at = new Date();
})

chatSchema.pre('findOneAndUpdate', function () {
    this.set({ updated_at: new Date() });
});

export const chatsModel = mongoose.models.chats || mongoose.model('chats', chatSchema);