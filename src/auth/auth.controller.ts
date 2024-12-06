/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { Response ,Request } from 'express';
import { AuthGuard } from './guard/auth.guard';

@Controller('')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('login')
    async login(@Body() userDto : UserDto , @Res() res :Response){
        const token = await this.authService.login(userDto);
      return  res.json({
            message:"کد به شماره شما ارسال شد",
            statusCode:200,
            token   
        })
    }
    @Post('otp-code')
    @UseGuards(AuthGuard)
    async checkUserCode(@Req() req :Request,@Res() res :Response,@Body('otpCode') otpCode :string){
        const token  =req.headers['authorization'];
        await this.authService.verifyCode(token,otpCode);
        return res.json({message:"کد تایید شد",statusCode:200})
    }
}
