import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: false, id: false });

userSchema.pre('save', function () {
    this.updated_at = new Date();
})

export const userModel = mongoose.models.users || mongoose.model('users', userSchema);