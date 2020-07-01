import {AddEvent, Events, UpdateEvent, DeleteEvent, } from "./eventResolver";
import { AddUser, loginUser } from "./userResolver";
import {missingField} from "../helpers";

export const resolvers = {
    Query: {
        events: () => Events()
    },
    Mutation: {
        addEvent: (parents, args) => {
            const { eventDescription, onlineStatus } = args;
            const fields = {eventDescription, onlineStatus};
            missingField(fields);
            return AddEvent(args);
        },
        updateEvent: (parents, args) => {
            const {eventId, eventDescription} = args;
            const fields = {eventId, eventDescription};
            missingField(fields);
            return UpdateEvent(args);
        },
        deleteEvent: (parents, args) => {
            const { eventId, eventDescription } = args;
            const fields = { eventId, eventDescription };
            missingField(fields);
            return DeleteEvent(eventId, eventDescription);
        },
        addUser: (args, { username, email, password}) => AddUser(username, email, password),
        loginUser: (args, {email, password}) => loginUser(email, password),
    }
}