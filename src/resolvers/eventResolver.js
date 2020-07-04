import Event from '../db/models/Event';
import User from '../db/models/User';
import moment from 'moment';
import uniqid from 'uniqid';
import { ApolloError } from "apollo-server-express";

export const AddEvent = async (args, email) => {
    const { eventDescription, onlineStatus, topics, eventDate } = args;
    try {
       const event = await Event.find({ eventDescription });
       if(event.length === 0) {
           const eventId = uniqid();
           const user = await User.findOne({email});
           const response = await Event.create({
               eventId, eventDescription, onlineStatus, topics,
               eventDate: moment().format(eventDate), user
           });
           return { ...response._doc }
       }
       return new ApolloError("Event already exists")
   }catch (e) {
        return new ApolloError ('Something went wrong')
   }
}

export const Events = async () => {
    try {
        const eventsResponse = await Event.find();
        return eventsResponse.map(async event => {
            const user = await User.findOne({_id: event.user})
            return {...event._doc, eventDate: event._doc.eventDate.toDateString(), user};
        })
    } catch (e) {
        return new ApolloError('Something went wrong')
    }
}

export const EventByUser = async (email) => {
    try {
        const user = await User.findOne({email});
        const eventResponse = await Event.find({user});
        return eventResponse.map(event => {
            return { ...event._doc, eventDate: event._doc.eventDate.toDateString(), user }
        });
    }catch (e) {
        console.log(e);
    }
}

export const UpdateEvent = async (args, email) => {
    const { eventId, eventDescription } = args;
    try {
        const user = await User.findOne({email});
        const events = await Event.find({ user });
        const eventIDExists = events.map(event => {
            if(event.eventId === eventId){
                return true
            }
           return false
        });
        if(!eventIDExists[0]) {
            return new ApolloError('You cannot update this event')
        }
        await Event.updateOne({eventId}, {$set: {eventDescription}}, {new: true});
        return { eventId, eventDescription, message: 'Successfully updated'};
    } catch (e) {
        return new ApolloError('Something went wrong');
    }
}

export const DeleteEvent = async (eventId, email) => {
    try {
        const user = await User.find({email});
        const events = await Event.find({user});
        let eventName;
        const eventIDExists = events.map(event => {
            if(event.eventId === eventId){
                eventName = event.eventDescription;
                return true
            }
            return false
        });
        if(!eventIDExists[0]) {
            return new ApolloError('You cannot update this event')
        };
        await Event.deleteOne({eventId});
        return { message: `Event ${eventName} successfully deleted` }
    }catch (e) {
        return new ApolloError('Something went wrong')
    }
}