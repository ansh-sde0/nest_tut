import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
  
    @PrimaryGeneratedColumn()
    name:string

    @Column()
    email:string

    @Column()
    password:string
}