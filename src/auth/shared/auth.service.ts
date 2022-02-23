import { Admin } from './../../admins/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminsService } from './../../admins/admins.service';
import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'querystring';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private adminService: AdminsService,
        private jwtService: JwtService,
        
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ){}

    async validateAdm (emailAdmin: string, senhaAdmin: string) {
        let admin = await this.adminService.getByEmail(emailAdmin);
        if (admin && admin.senhaAdmin === senhaAdmin) {
            let {id, emailAdmin} = admin;
            return {id, emailAdmin};
        }
        
        return null;
    }

    async login(admin: any) {
        
        let adminUser = await this.adminRepository.findOne({where: {emailAdmin: admin.emailAdmin}, select: ['senhaAdmin', 'confSenha', 'emailAdmin']});
        if(!adminUser) throw new HttpException('Usuário ou senha inválidos', 406);

        if(this.comparePassword(admin.senhaAdmin, adminUser.senhaAdmin)) {
            const payload = { emailAdmin: adminUser.emailAdmin, sub: adminUser.id };
            
            let token = this.jwtSign(payload)

            return {token, id: adminUser.id}
        }
        throw new HttpException('Login inválido', 406)
    }
       
    async comparePassword (attempt: string, pwd: string) {
        return await compare(attempt, pwd)
    }

    jwtSign(payload): string {
        return this.jwtService.sign(payload)
    }

    async validateJwt(token) {
        try {
            await this.jwtService.verify(token.split(" ")[1]);

            return true;
        } catch(e) {
            return false;
        }
    }

}
