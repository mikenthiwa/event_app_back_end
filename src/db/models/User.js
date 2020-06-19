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

}, { timeStamp: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;