/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { SmsService } from 'src/users/sms.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        
        private readonly userService:UsersService,
        private readonly smsService : SmsService,
        private readonly jwtservice :JwtService
    ){}

  async login(userDto : UserDto){
    const userExist = await this.userService.findOne(userDto);
    const verficationCode = Math.floor(Math.random() * 10000).toString();
    if(!userExist){
        await this.userService.create(userDto,verficationCode);
    }else{
        await this.userService.createUserLoginStatus(userExist,verficationCode);
    }
    await this.smsService.sendOtpCode(`کد تایید شما : ${verficationCode}`,userDto.mobile);
    return await this.jwtservice.sign({mobile:userDto.mobile});

  }

 
 async verifyCode(token:string,otpCode:string){
     token = token.split(' ')[1];
    const decodedToken  = await this.jwtservice.verify(token);
    const code = await this.userService.getUserOtpCode(decodedToken.mobile);
    console.log(token);
    console.log(code);
    console.log(otpCode);
    
  if(otpCode !== code){
    throw new UnauthorizedException("کد وارد شده صحیح نمی باشد");
  }
  return true;
  }
}
