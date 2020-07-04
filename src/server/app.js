import express from 'express';
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import typeDefs from '../schema';
import { resolvers } from "../resolvers";
import dbConnection from "../db/models";
import {authMiddleware} from "../middleware";



export default () => {
    const app = express();
    app.use(cors());
    const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({req}) => {
                const isLogged = authMiddleware(req);
                console.log(isLogged);
                return isLogged;
            },
            playground: true,
            introspection: true
    });
    apolloServer.applyMiddleware({ app });
    dbConnection();
    return app;
}