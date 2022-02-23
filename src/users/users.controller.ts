import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: Body, @Param('cpf') cpf: string) {
    return this.usersService.create(cpf, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/criarHabilidade/:userId')
  createH(@Body() body: any, @Param('userId') userId: number) {
    return this.usersService.createH(userId, body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/criarContato/:userId')
  createC(@Body() body: any, @Param('userId') userId: number) {
    return this.usersService.createC(userId, body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/criarEndereco/:userId')
  createE(@Body() body: any, @Param('userId') userId: number) {
    return this.usersService.createE(userId, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:userId')
  update(@Param('userId') userId: number, @Body() body: Body) {
    return this.usersService.update(+userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
