export const mysqlconfig = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'teste123',
    database: 'project',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    // "extra": {
    //     "trustServerCertificate": true
    // } _________CASO UTILIZE O DOCKER_________
}