import { gql } from 'apollo-server-express';

export const UserDef = gql`
    type User {
        token: String
        message: String
        username: String
    }
    
    extend type Mutation {
        register(username: String, email: String, password: String): User
        loginUser(email: String!, password: String!): User
    }
`;