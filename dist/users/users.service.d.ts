import { User } from './entities/users.entity';
import { EntityManager } from 'typeorm';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: EntityManager);
    getusers(): Promise<User[]>;
    userexists(email: any): Promise<User[]>;
    adduser(user_body: any): Promise<"User added" | "User already exists with this email">;
    updateuser(user_req: any, user_body: any): Promise<"User updated" | "User updated failed" | "User does not exists">;
    deleteuser(user_req: any): Promise<"User does not exists" | "User deleted" | "User deletion failed">;
}
