import {AddEvent, Events, UpdateEvent, DeleteEvent, EventByUser } from "./eventResolver";
import { AddUser, loginUser } from "./userResolver";
import {missingField} from "../helpers";
import { ApolloError } from "apollo-server-express";

export const resolvers = {
    Query: {
        events: () => {
            return Events();
        },
        eventsByUser: (parents, args, context) => {
            const { isAuthenticated, error, email} = context;
            if(!isAuthenticated){
                throw new ApolloError(error)
            };
            return EventByUser(email);
        }
    },
    Mutation: {
        addEvent: (parents, args, context) => {
            const { isAuthenticated, error, email} = context;
            const { eventDescription, onlineStatus, topics, eventDate } = args;
            const fields = {eventDescription, onlineStatus, topics, eventDate};
            if(!isAuthenticated){
                throw new ApolloError(error)
            }
            missingField(fields);
            return AddEvent(args, email);
        },
        updateEvent: (parents, args, context) => {
            const { isAuthenticated, error, email} = context;
            if(!isAuthenticated) {
                throw new ApolloError(error)
            }
            const {eventId, eventDescription} = args;
            const fields = {eventId, eventDescription};
            missingField(fields);
            return UpdateEvent(args, email);
        },
        deleteEvent: (parents, args, context) => {
            const { isAuthenticated, error, email} = context;
            if(!isAuthenticated) {
                throw new ApolloError(error)
            }
            const { eventId } = args;
            const fields = { eventId };
            missingField(fields);
            return DeleteEvent(eventId, email);
        },
        register: (parents, args, { username, email, password }) => {
            const fields = { username, email, password }
            missingField(fields)
            return AddUser(username, email, password)
        },
        loginUser: (args, {email, password}) => {
            const fields = { email, password };
            missingField(fields);
            return loginUser(email, password)
        },
    }
}