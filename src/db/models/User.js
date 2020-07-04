import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 15,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        minLength: 3,
        maxLength: 15,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        trim: true,
        default: false
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: "Event"
    }]
}, { timeStamp: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;