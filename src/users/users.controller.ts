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

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Body) {
    return this.usersService.update(+id, body);
  }

  @Put('/updateH/:userId')
  updateH(@Param('userId') userId: number, @Body() body: any) {
    return this.usersService.updateH(userId, body);
  }

  @Put('/updateC/:userId')
  updateC(@Param('userId') userId: number, @Body() body: any) {
    return this.usersService.updateC(userId, body);
  }

  @Put('/updateE/:userId')
  updateE(@Param('userId') userId: number, @Body() body: any) {
    return this.usersService.updateE(userId, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
