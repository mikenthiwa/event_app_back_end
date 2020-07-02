import { gql } from 'apollo-server-express';

export const EventDef = gql`
    type Event {
        eventId: String
        eventDescription: String
        onlineStatus: Boolean
        topics: [String]
        eventDate: String
    }
    type UpdateEvent {
        eventId: String
        eventDescription: String
        message: String
    }
    
    type DeleteMessage {
        message: String
    }
    
    type Query {
        events: [Event]
    }
    
    type Mutation {
        addEvent(eventDescription: String, onlineStatus: Boolean, topics: [String], eventDate: String): Event
        updateEvent(eventDescription: String, eventId: String): UpdateEvent
        deleteEvent(eventName: String, eventId: String): DeleteMessage
    }
`;
