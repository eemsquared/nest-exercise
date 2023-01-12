import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { IsUnique } from "src/validations/is-unique.validation";

export type UserDocument = HydratedDocument<User>

@Schema({
    timestamps: true
})

export class User {
    @Prop()
    @IsString()
    @IsNotEmpty()
    @IsUnique('User')
    username: string

    @Prop()
    @IsString()
    @IsNotEmpty()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', function save(next) {
    const user = this
    if (user.password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        bcrypt.hash(user.password, saltRounds, function(err: any, hash: any) {
            user.password = hash
            next()
        });
    }
})