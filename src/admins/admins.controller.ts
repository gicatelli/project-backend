import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() body: Body, @Param('emailAdmin') emailAdmin: string) {
    return this.adminsService.create(emailAdmin, body);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

}
