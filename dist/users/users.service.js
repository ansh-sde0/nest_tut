"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./entities/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getusers() {
        const all_users = this.userModel.find(users_entity_1.User);
        return all_users;
    }
    async userexists(email) {
        const email_exists = await this.userModel.find(users_entity_1.User, {
            where: {
                email: email
            }
        });
        return email_exists;
    }
    async adduser(user_body) {
        const user_exists = await this.userexists(user_body.email);
        if (!user_exists.length) {
            const user = new users_entity_1.User();
            Object.assign(user, user_body);
            await this.userModel.insert(users_entity_1.User, user);
            return 'User added';
        }
        return 'User already exists with this email';
    }
    async updateuser(user_req, user_body) {
        const user_exists = await this.userexists(user_req.query.email);
        if (user_exists.length) {
            const result = await this.userModel.update(users_entity_1.User, { email: user_req.query.email }, user_body);
            if (result.affected) {
                return 'User updated';
            }
            return 'User updated failed';
        }
        return 'User does not exists';
    }
    async deleteuser(user_req) {
        const user_exists = await this.userexists(user_req.query.email);
        if (user_exists.length) {
            const result = await this.userModel.delete(users_entity_1.User, { email: user_req.query.email });
            if (result.affected) {
                return 'User deleted';
            }
            return 'User deletion failed';
        }
        return 'User does not exists';
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map