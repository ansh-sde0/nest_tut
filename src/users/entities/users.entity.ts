import { Entity, Column, PrimaryGeneratedColumn,ObjectID,ObjectIdColumn } from 'typeorm';

@Entity({name:'users'})
export class User {
    
    @ObjectIdColumn()
    _id:ObjectID

    @PrimaryGeneratedColumn()
    name:string

    @Column()
    email:string

    @Column()
    password:string
}