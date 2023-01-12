import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersService{
    constructor(@InjectModel('User') private userModel: Model<UserDocument>){}

    async findOne(username: string) {
        const ret = await this.userModel.findOne({username}).exec()
        return ret
    }

    async create(username: string, password: string) {
        try {
            const user = await new this.userModel({
                username,
                password
            }).save()

            return user
        }
        catch(error) {
            throw error
        }
    }

    async findAll() {
        return await this.userModel.find().exec()
    }
}