import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800,// this is the expiry time in seconds
    },
});

const Notice = mongoose.model('Notice', NoticeSchema);

export default Notice;
