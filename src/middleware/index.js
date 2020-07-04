import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let decodeToken;

export const authMiddleware = (req) => {
    const token = req.headers.authorization;
    const initialContext = {
        isAuthenticated: false,
        email: '',
        message: '',
        error: ''
    }

    if(!token) {
        return {...initialContext, isAuthenticated: false, message: '', error: 'Please provide token', email: ''}
    }
    try {
        decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    }catch (e) {
        return {...initialContext, isAuthenticated: false, message: '', error: 'Invalid token provided', email: ''}
    }
    if(!decodeToken) {
        return {...initialContext, isAuthenticated: false, message: '', error: 'Invalid token provided', email: ''}
    }
    const { email } = decodeToken
    return {...initialContext, isAuthenticated: true, message: 'Success', error: '', email: email}
}