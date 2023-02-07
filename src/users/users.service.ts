import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { MongoRepository } from "typeorm"
import { InjectEntityManager} from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'

@Injectable()
export class UserService {

    constructor(@InjectEntityManager() private readonly userModel:EntityManager) {}

    getusers(){

        const all_users = this.userModel.find(User)
        return all_users
    }

    async userexists(email){
        
        const email_exists = await this.userModel.find(User,{
            where:{
                email:email
            }
        })

        return email_exists
    }   
    
    async adduser(user_body){
        
        const user_exists = await this.userexists(user_body.email)
            
        if (!user_exists.length){

            const user = new User()
            Object.assign(user,user_body)

            await this.userModel.insert(User,user)

            return 'User added'
        }
        return 'User already exists with this email'
    }
    
    async updateuser(user_req,user_body){

        const user_exists = await this.userexists(user_req.query.email)

        if (user_exists.length){
            
            const result = await this.userModel.update(User,{email:user_req.query.email},user_body)
            
            if (result.affected){
                return 'User updated'
            }
            return 'User updated failed'

        }
        return 'User does not exists'
    }

    async deleteuser(user_req){

        const user_exists = await this.userexists(user_req.query.email)

        if (user_exists.length){

            const result = await this.userModel.delete(User,{email:user_req.query.email})
            
            if (result.affected){
                return 'User deleted'
            }

            return 'User deletion failed'
        }
        return 'User does not exists'
    }       
}