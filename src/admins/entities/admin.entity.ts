import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity('Administradores')
export class Admin {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    emailAdmin: string

    @Column({select: false})
    senhaAdmin: string

    @Column({select: false})
    confSenha: string

    @BeforeInsert()
    async hashPassword() {
        this.senhaAdmin = await bcrypt.hash(this.senhaAdmin, 16)
        this.confSenha = await bcrypt.hash(this.confSenha, 16)
    }

}