import express from 'express';
import { ApolloServer } from "apollo-server-express";
import typeDefs from '../schema';
import {resolvers} from "../resolvers";
import dbConnection from "../db";

export default () => {
    const app = express();
    const apolloServer = new ApolloServer({typeDefs, resolvers});
    apolloServer.applyMiddleware({ app });
    dbConnection();
    return app;
}