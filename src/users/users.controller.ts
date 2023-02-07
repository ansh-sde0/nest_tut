import { Controller, Get, Post, Put, Req, Delete, Res, Body,UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service'
import { UserDTO } from './dto/users.dto';


@Controller('users')
export class UserController{
    constructor(private readonly userservice: UserService) {}

    @Get()
    async getusers(@Res() res){

        const response = await this.userservice.getusers()
        res.status(200).send({result:response})
    }

    @Post('add')
    @UsePipes(new ValidationPipe({ forbidNonWhitelisted:true }))
    async adduser(@Req() req, @Res() res, @Body() body:UserDTO){

        const response = await this.userservice.adduser(body)

        res.status(200).send(response)
    }

    @Put('update')
    async updateuser(@Req() req, @Res() res, @Body() body:UserDTO){
        
        const response = await this.userservice.updateuser(req,body)

        res.status(200).send(response)
    }

    @Delete('delete')
    async deleteuser(@Req() req, @Res() res){

        const response = await this.userservice.deleteuser(req)

        res.status(200).send(response)

    }
}
