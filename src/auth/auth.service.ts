/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/users/sms.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { MobileDto as MobileDto } from './dto/login-with-otp.dto';
import { SetPasswordDto } from './dto/set-password.dto';


@Injectable()
export class AuthService {
  constructor(

    private readonly userService: UsersService,
    private readonly smsService: SmsService,
    private readonly jwtservice: JwtService
  ) { }


  async login(authDto: MobileDto) {
    const userExist = await this.userService.findOne(authDto.mobile);
    const verficationCode = Math.floor(Math.random() * 10000).toString();
    if (!userExist) {
      await this.userService.create(authDto.mobile, verficationCode, null);
    } else {
      await this.userService.createUserLoginStatus(userExist, verficationCode, null);
    }
    await this.smsService.sendOtpCode(`کد تایید شما : ${verficationCode}`, authDto.mobile);

  }


  async verifyCode(authDto: MobileDto, otpCode: string) {
    const user = await this.userService.findOne(authDto.mobile);
    if (!user) {
      throw new BadRequestException("user not found")
    }

    const code = await this.userService.getUserOtpCode(authDto.mobile);
    const token = await this.generateJwt({ id: user.id, mobile: authDto.mobile, role: "user" });

    console.log(token);
    console.log(code);
    console.log(otpCode);

    if (otpCode !== code) {
      throw new UnauthorizedException("کد وارد شده صحیح نمی باشد");
    }
    return token;
  }

  async updatePassword(passDto: SetPasswordDto, mobileDto: MobileDto) {
    const hasPassword = await this.userService.checkUserHasPassword(mobileDto);

    if (!hasPassword) {
      const hashedPassword = await bcrypt.hash(passDto.password, 12);
      return await this.userService.setUserPassword(mobileDto, hashedPassword);
    }

    return 'You already have a password.';
  }


  async loginWithPassword(authDto: MobileDto, passDto: SetPasswordDto) {
    const user = await this.userService.findOne(authDto.mobile);

    if (!user) {
      throw new BadRequestException("رمز عبور یا موبایل اشتباه است");
    }

    const isPasswordCorect = await bcrypt.compare(passDto.password, user.password);
    if (!isPasswordCorect) {
      throw new BadRequestException("رمز عبور یا موبایل اشتباه است");
    }

    const token = await this.generateJwt({ id: user.id, mobile: authDto.mobile });

    return token;
  }

  async generateJwt(data: object) {
    const token = await this.jwtservice.sign(data);
    return token;
  }

}
