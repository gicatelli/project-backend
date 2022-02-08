import { mysqlconfig } from './mysql.confg';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

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
  }), UsersModule],

  controllers: [AppController, UsersController],

  providers: [AppService],

})

export class AppModule {}
