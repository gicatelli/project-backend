import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './shared/constants';
import { JwtStrategy } from './shared/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './shared/local.strategy';
import { AdminsModule } from './../admins/admins.module';
import { AuthService } from './shared/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Admin } from 'src/admins/entities/admin.entity';

@Module({
    
    imports: [
        AdminsModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'},
        }),
        TypeOrmModule.forFeature([Admin])
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
})

export class AuthModule { }
