/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({ secret: 'hard!to-guess_secret' ,
    }),
    UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
