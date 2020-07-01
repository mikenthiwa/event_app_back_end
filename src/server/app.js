import express from 'express';
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import typeDefs from '../schema';
import { resolvers } from "../resolvers";
import dbConnection from "../db/models";


export default () => {
    const app = express();
    app.use(cors());
    const apolloServer = new ApolloServer({typeDefs, resolvers});
    apolloServer.applyMiddleware({ app });
    dbConnection();
    return app;
}