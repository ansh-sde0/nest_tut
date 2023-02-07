import { UserService } from './users.service';
import { UserDTO } from './dto/users.dto';
export declare class UserController {
    private readonly userservice;
    constructor(userservice: UserService);
    getusers(res: any): Promise<void>;
    adduser(req: any, res: any, body: UserDTO): Promise<void>;
    updateuser(req: any, res: any, body: UserDTO): Promise<void>;
    deleteuser(req: any, res: any): Promise<void>;
}
