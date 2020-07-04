import { UserInputError} from "apollo-server-express";
import emailValidator from "email-validator";


export const missingField = (obj) => {
    return Object.keys(obj).forEach(field => {
        if(obj[field] === undefined){
            throw new UserInputError(`${field} is missing`)
        }
        if(obj[field] === "") {
            throw new UserInputError(`${field} is required`)
        }
        if(field === "email") {
            const isValid = emailValidator.validate(obj[field]);
            if(!isValid) {
                throw new UserInputError(`${field} is not valid`);
            }
        }
        if(field === "username" || "password" || "eventDescription") {
            if(obj[field].length < 3) {
                throw new UserInputError(`${field} is too short`)
            }
        }
    })
}