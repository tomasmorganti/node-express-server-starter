import User from '@/modules/user/user.model';
import { v4 as uuidv4 } from 'uuid';

export const getUserByUsername = async (username: string) => {
    const usersFound = await User.query().where('username', '=', username);
    return usersFound[0];
};

export const createUser = async (newUserData: { username: string; password: string; email: string }) => {
    const { username, password, email } = newUserData;
    const newUser = await User.query()
        .insert({
            id: uuidv4(),
            username,
            password,
            email,
        })
        .returning('*');
    return newUser;
};
