import { Request, Response } from 'express';
import * as UserService from '@/modules/user/user.service';
import { HTTP400Error } from '@/utils/httpErrors';

type RegisterUserResObj = {
    id: string;
    username: string;
    email: string;
    verified: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userWithRequestedUsername = await UserService.getUserByUsername(username);
    if (userWithRequestedUsername) {
        throw new HTTP400Error('Username not available.');
    }
    const newUser = await UserService.createUser({ username, email, password });
    const responseObj: RegisterUserResObj = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        verified: newUser.verified,
        active: newUser.active,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
    };
    // const { password: hashedPassword, ...userObjectOmitHashedPassword } = newUser;
    return res.status(201).send(responseObj);
};
