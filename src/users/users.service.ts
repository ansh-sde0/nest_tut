import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { MongoRepository } from "typeorm"

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userModel:MongoRepository<User>) {}

    getusers(){

        const all_users = this.userModel.find()
        return all_users
    }

    async userexists(email){
        
        const email_exists = await this.userModel.find({

            where: {
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

            await this.userModel.insertOne(user)

            return 'User added'
        }
        return 'User already exists with this email'
    }
    
    async updateuser(user_req,user_body){

        const user_exists = await this.userexists(user_req.query.email)

        if (user_exists.length){
            
            const result = await this.userModel.updateOne({email:user_req.query.email},{$set:user_body})
            
            if (result.result.nModified){
                return 'User updated'
            }
            return 'User updated failed'

        }
        return 'User does not exists'
    }

    async deleteuser(user_req){

        const user_exists = await this.userexists(user_req.query.email)

        if (user_exists.length){

            const result = await this.userModel.deleteOne({email:user_req.query.email})
            
            if (result.deletedCount){
                return 'User deleted'
            }

            return 'User deletion failed'
        }
        return 'User does not exists'
    }       
}