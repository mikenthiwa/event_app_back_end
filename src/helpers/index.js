import { ApolloError, UserInputError} from "apollo-server-express";



export const missingField = (obj) => {
    return Object.keys(obj).forEach(field => {
        if(obj[field] === undefined){
            throw new UserInputError(`${field} is missing`)
        }
    })
}