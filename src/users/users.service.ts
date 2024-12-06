/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './enities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserLoginStatusEntity } from './enities/user-login-status.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // Inject UserEntity repository

    @InjectRepository(UserLoginStatusEntity)
    private readonly userLoginStatusRepository: Repository<UserLoginStatusEntity>, // Inject UserLoginStatusEntity repository
  ) {}

    async findOne(userDto:UserDto):Promise<UserEntity>{
        return await this.userRepository.findOne({where:{mobile:userDto.mobile}});
    }

    async create(userDto :UserDto,verificationCode:string){
        const newUser = await this.userRepository.create(userDto);
      await this.userRepository.save(newUser);
     const userLoginStatus = await this.userLoginStatusRepository.create({
        user:newUser,
        verificationCode:verificationCode
      })
      await this.userLoginStatusRepository.save(userLoginStatus);
    }


   async createUserLoginStatus(user:UserEntity,verificationCode:string){
    const userLoginStatus = await this.userLoginStatusRepository.create({
        user:user,
        verificationCode:verificationCode
      })
      await this.userLoginStatusRepository.save(userLoginStatus);
    }

    async getUserOtpCode(mobile: string) {
      const user = await this.userRepository.findOne({ where: { mobile: mobile } });

          const userLoginStatus = await this.userLoginStatusRepository.findOne({
        where: { user: user },order:{created_at:"DESC"}
      });
    
    
      return userLoginStatus.verificationCode;
    }
    
}
