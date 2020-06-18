import {example, author} from "./exampleResolver";

export const resolvers = {
    Query: {
        books: () => example,
        authors: () => author,
    },
    Mutation: {
        addBook: (parent, args) => {
            example.push(args)
            return args
        }
    }
}