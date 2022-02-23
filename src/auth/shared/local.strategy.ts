import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            usernameField: 'emailAdmin',
            passwordField: 'senhaAdmin',
        });
    }

    async validate(emailAdmin: string, senhaAdmin: string): Promise<any> {
        let admin = await this.authService.validateAdm(emailAdmin, senhaAdmin);
        if (!admin) {
            throw new UnauthorizedException();
        }
        return admin;
    }
}