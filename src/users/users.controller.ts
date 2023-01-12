import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.schema';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Post('register')
    create(@Body() { username }: User, @Body() { password }: User) {
        return this.userService.create(username, password)
    }

    @Get()
    getAll() {
        return this.userService.findAll()
    }
}
