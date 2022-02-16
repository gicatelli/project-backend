import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: Body) {
    console.log('Tentando inserir');
    return this.usersService.create(body);
  }
  

  @Post('/criarHabilidade/:userId')
  createH(@Body() body: any, @Param('userId') userId: number) {
    return this.usersService.createH(userId, body)
  }

  @Post('/criarContato/:userId')
  createC(@Body() body: any, @Param('userId') userId: number) {
    return this.usersService.createC(userId, body)
  }

  @Post('/criarEndereco/:userId')
  createE(@Body() body: any, @Param('userId') userId: number) {
    return this.usersService.createE(userId, body)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put('/update/:userId')
  update(@Param('userId') userId: number, @Body() body: Body) {
    return this.usersService.update(+userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
