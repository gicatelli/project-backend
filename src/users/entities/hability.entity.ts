import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('Habilidade')
export class Hability {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    nivel: string

    @Column()
    formacao: string

    @Column()
    habilidade: string

    @ManyToOne(() => User, people => people.habilidades, {cascade: true, onDelete: 'CASCADE'})
    pessoa: User

}