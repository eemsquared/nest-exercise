import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IsUniqueConstraint } from "src/validations/is-unique.validation";
import { User, UserSchema } from "./user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, IsUniqueConstraint],
    exports: [UsersService],
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ]
})

export class UsersModule{}