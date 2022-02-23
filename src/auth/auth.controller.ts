import { AuthService } from './shared/auth.service';
import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller()
export class AuthController { 

    constructor(
        private authService: AuthService,
    ) {}

    @Post('auth/login')
    async login(@Body() body: any) {
        console.log(body)
        return this.authService.login(body);
    }

}
