import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, Injectable } from "@nestjs/common";
import { jwtConstants } from './constants';
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/admins/entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    // async validate(payload: any) {
    //     return { id: payload.sub, emailAdmin: payload.emailAdmin };
    // }
    
    async validate(payload: {id: number}): Promise<{id: number}> {
        const validUser = await this.refreshUserData(payload.id)

        return {id: validUser.id}
    }

    async refreshUserData(userId: number) : Promise<any> {
        const dbUser = await this.adminRepository.findOne(userId)

        if(!dbUser) {
            throw new HttpException('Usuário não encontrado', 404)
        }

        return dbUser
    }
}