import mongoose from 'mongoose';

const { Schema } = mongoose;

export const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
    },
    eventDescription: {
        type: String,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 15,
        required: true
    },
    onlineStatus: {
        type: Boolean,
        required: true,
    }
});

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;