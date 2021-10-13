import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import User from './user.model';

export const hashPassword = (password: string) => {
    return argon2.hash(password);
};

export const verifyPassword = (hashedPassword: string, providedPassword: string) => {
    return argon2.verify(hashedPassword, providedPassword);
};

export const getUserByUsername = async (username: string) => {
    const usersWithUsername = await User.query().where('username', '=', username);
    return usersWithUsername[0];
};

export const createUser = async (newUserData: { username: string; password: string; email: string }) => {
    const { username, password, email } = newUserData;
    const hashedPassword = await hashPassword(password);
    const newUser = await User.query()
        .insert({
            id: uuidv4(),
            username,
            password: hashedPassword,
            email,
        })
        .returning('*');
    return newUser;
};
