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
    topics: [],
    onlineStatus: {
        type: Boolean,
        required: true,
    },
    eventDate: {
        type: Date,
        required: String
    }
});

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;