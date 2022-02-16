import { Hability } from './entities/hability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { where } from 'sequelize/dist';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Injectable, Body } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {

  }

  async create(body: any) {
    let users = await this.userRepository.save(this.userRepository.create(body as DeepPartial<User>));
    return users;
  }

  async createH(userId: number, body: any) {
    let userExist = await this.userRepository.findOne({where: {id: userId}, relations: ['habilidades']});

    if (userExist) {
      userExist.habilidades = [...userExist.habilidades, body];
      return await this.userRepository.save(userExist);
    }
  }

  async createC(userId: number, body: any) {
    let userExist = await this.userRepository.findOne({where: {id: userId}, relations: ['contatos']});

    if (userExist) {
      userExist.contatos = [...userExist.contatos, body];
      return await this.userRepository.save(userExist);
    }
  }

  async createE(userId: number, body: any) {
    let userExist = await this.userRepository.findOne({where: {id: userId}, relations: ['enderecos']});

    if (userExist) {
      userExist.enderecos = [...userExist.enderecos, body];
      return await this.userRepository.save(userExist);
    }
  }

  async findAll(): Promise<User[]> {
    let users = await this.userRepository.find({relations: ['habilidades', 'contatos', 'enderecos']});
    return users;
  }

  async findOne(id: number): Promise<User> {
    let users = await this.userRepository.findOne({where: {id: id}, relations: ['enderecos', 'contatos', 'habilidades']});
    return users;
  }
  
  async update(userId:number, body: any) {
    let users = await this.userRepository.findOne({where: {id: userId}, relations: ['habilidades', 'contatos', 'enderecos']});
    if (users) {
      users = body
      return this.userRepository.save(users);
    }
  }

  async remove(userId: number) {
    let users = await this.userRepository.findOne({where: {id: userId}, relations: ['enderecos', 'contatos', 'habilidades']});
    return this.userRepository.delete(userId);
  }
}
