import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, pass: string) {
        let ret = null
        const bcrypt = require('bcrypt');
        const user = await this.userService.findOne(username)
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password)
            if (isMatch) ret = user
        } else {
            throw new UnauthorizedException('Invalid username or password.')
        }
    
        return ret
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
