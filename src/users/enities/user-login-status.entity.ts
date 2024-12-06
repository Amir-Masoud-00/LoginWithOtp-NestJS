/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { UserEntity } from './user.entity';
  
  @Entity()
  export class UserLoginStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    verificationCode: string;
  
    @CreateDateColumn({type:"timestamp",default:() => "CURRENT_TIMESTAMP(6)"})
    created_at:Date
  
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.loginstatus, {
      onDelete: 'CASCADE', 
    })
    user: UserEntity;
  }
  