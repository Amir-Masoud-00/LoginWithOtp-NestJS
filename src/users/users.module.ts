/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './enities/user.entity';
import { UserLoginStatusEntity } from './enities/user-login-status.entity';
import { SmsService } from './sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserLoginStatusEntity])],
  controllers: [UsersController],
  providers: [UsersService,SmsService],
  exports:[UsersService,SmsService]
 
})
export class UsersModule {}
