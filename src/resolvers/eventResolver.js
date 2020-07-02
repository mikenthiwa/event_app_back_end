import Event from '../db/models/Event';
import moment from 'moment';
import uniqid from 'uniqid';
import { ApolloError } from "apollo-server-express";

export const AddEvent = async args => {
    const { eventDescription, onlineStatus, topics, eventDate } = args;
    try {
       const event = await Event.find({ eventDescription });
       if(event.length === 0) {
           const eventId = uniqid();
           const response = await Event.create({
               eventId, eventDescription, onlineStatus, topics,
               eventDate: moment().format(eventDate)
           });
           return { ...response._doc }
       }
       return new ApolloError("Event already exists")
   }catch (e) {
       console.log(e)
        return new ApolloError ('Something went wrong')
   }
}

export const Events = async () => {
    try {
        const eventsResponse = await Event.find();
        return eventsResponse.map(event => {
            return {...event._doc, eventDate: event._doc.eventDate.toDateString()};
        })
    } catch (e) {
        return new ApolloError('Something went wrong')
    }
}

export const UpdateEvent = async args => {
    const { eventId, eventDescription } = args;
    try {
        const count = await Event.count({eventId});
        if(count > 0) {
            await Event.updateOne({eventId}, {$set: {eventDescription}}, {new: true});
            return {eventId, eventDescription, message: 'Successfully updated'};
        }
        return new ApolloError('Event does not exist!');
    } catch (e) {
        return new ApolloError('Something went wrong');
    }
}

export const DeleteEvent = async (eventId, eventName) => {
    try {
        const count = await Event.count({eventId})
        if(count > 0) {
            await Event.deleteOne({eventId});
            return { message: `Event ${eventName} successfully deleted` }
        }
        return new ApolloError('Event does not exist')
    }catch (e) {
        return new ApolloError('Something went wrong')
    }
}