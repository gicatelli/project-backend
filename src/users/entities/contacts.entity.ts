import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('Contatos')
export class contacts {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    telefone: string

    @Column()
    celular: string

    @Column()
    email: string

    @ManyToOne(() => User, people => people.contatos, {cascade: true, onDelete: 'CASCADE'})
    pessoa: User

}