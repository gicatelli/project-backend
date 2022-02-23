import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { address } from "./address.entity";
import { contacts } from "./contacts.entity";
import { Hability } from "./hability.entity";

@Entity('Pessoas')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    idade: number

    @Column()
    cpf: string
    
    @OneToMany(()=> Hability, relacao => relacao.pessoa, {cascade: [ 'insert', 'update' ]})
    habilidades: Hability []

    @OneToMany(()=> contacts, relacao1 => relacao1.pessoa, {cascade: [ 'insert', 'update' ]})
    contatos: contacts []

    @OneToMany(()=> address, relacao2 => relacao2.pessoa, {cascade: [ 'insert', 'update' ]})
    enderecos: address []
    
}