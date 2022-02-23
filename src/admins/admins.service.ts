import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class AdminsService {

    constructor(
      @InjectRepository(Admin)
      private adminRepository: Repository<Admin>,
    ) {}

    async create(emailAdmin: string, body: any) {
      let admins = await this.adminRepository.findOne({where: {emailAdmin: body.emailAdmin}})
      if (admins) {
        throw new HttpException('Usuário já cadastrado', 406)
      } else {
        await this.adminRepository.save(this.adminRepository.create(body as DeepPartial<Admin>));
      }
    }

    async findAll(): Promise<Admin[]> {
      let admins = await this.adminRepository.find({});
      return admins;
    }
  
    async findOne(id: number): Promise<Admin> {
      let admins = await this.adminRepository.findOne({where: {id: id}});
      return admins;
    }

    async getByEmail(emailAdmin: string) {
      return await this.adminRepository.findOne({where: {emailAdmin: emailAdmin}});
    }

}