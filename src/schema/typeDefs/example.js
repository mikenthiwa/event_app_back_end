import { gql } from 'apollo-server-express';

export const ExampleDef = gql`
    type Book {
        title: String
        author: Author
    }
    
    type Query {
        books: [Book]
    }
    
    type Mutation {
        addBook(title: String, author: String): Book
    }
`;

export const AuthorDef = gql`
    type Author {
        name: String
        books: [Book]
    }
    
    extend type Query {
        authors: [Author]
    }
`;