/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserLoginStatusEntity } from "./user-login-status.entity";

@Entity({name: 'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({default:null})
    name:string;
    @Column({default:null})
    family:string;
    @Column({length:11})
    mobile:string;
    @OneToMany(()=>UserLoginStatusEntity , (status)=>status.user)
    loginstatus:UserLoginStatusEntity[];

}