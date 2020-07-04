import User from '../db/models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { ApolloError } from "apollo-server-express";

dotenv.config();

export const AddUser = async (username, email, password) => {
    try {
        const count = await User.count({email});
        if(count === 0) {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            if(email === 'mike.nthiwa@gmail.com') {
                await User.create({username, email, password: hashPassword, isAdmin: true});
                const token = jwt.sign({email}, process.env.SECRET_KEY);
                return { message: "You have successfully created a user", token, username };
            }
            await User.create({username, email, password: hashPassword});
            const token = jwt.sign({email}, process.env.SECRET_KEY)
            return { message: "You have successfully created a user", token, username }
        }
        return new ApolloError('Email already exists')
    } catch {
        return new ApolloError('Something went wrong')
    }
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({email});
    if(user) {
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            const token = jwt.sign({email}, process.env.SECRET_KEY)
            return {message: 'Login Success', token, username: user.username}
        }
        return new ApolloError('email or password is not correct');
    }
    return new ApolloError('email or password is not correct');
};