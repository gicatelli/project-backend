import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('Enderecos')
export class address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    logradouro: string

    @Column()
    numero: number

    @Column()
    bairro: string

    @Column()
    cidade: string

    @Column()
    pais: string

    @ManyToOne(() => User, people => people.enderecos, {cascade: true, onDelete: 'CASCADE'})
    pessoa: User

}