import { AdminsController } from './admins/admins.controller';
import { AuthModule } from './auth/auth.module';
import { mysqlconfig } from './mysql.confg';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';

@Module({

  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: mysqlconfig.host,
    port: mysqlconfig.port,
    username: mysqlconfig.username,
    password: mysqlconfig.password,
    database: mysqlconfig.database,
    entities: mysqlconfig.entities,
    synchronize: mysqlconfig.synchronize,
  }), UsersModule, AuthModule, AdminsModule],

  controllers: [AppController, UsersController, AdminsController],

  providers: [AppService],

})

export class AppModule {}
