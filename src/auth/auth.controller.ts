/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './guard/auth.guard';
import { MobileDto } from './dto/login-with-otp.dto';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller('')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() authDto: MobileDto, @Res() res: Response) {
        const token = await this.authService.login(authDto);
        return res.json({
            message: "کد به شماره شما ارسال شد",
            statusCode: 200,
            token
        })
    }

    @Post('otp-code')
    async checkUserCode(@Res() res: Response, @Body() authDto: MobileDto, @Body('otpCode') otpCode: string) {

        const token = await this.authService.verifyCode(authDto, otpCode);

        return res.json({ message: "کد تایید شد", statusCode: 200, token })
    }


    @Patch('set-password')
    @UseGuards(AuthGuard)
    async setPassword(@Res() res, @Body() mobileDto: MobileDto,
        @Body() passDto: SetPasswordDto
    ) {
        await this.authService.updatePassword(passDto, mobileDto);
        return res.status(200).json({
            msg: "کلمه عبور با موفقیت تغییر کرد",
            statusCode: 200,
        })
    }

    @Post('login-with-password')
    async loginWithPassword(@Res() res: Response, @Body() autDto: MobileDto, @Body() passDto: SetPasswordDto) {
        const token = await this.authService.loginWithPassword(autDto, passDto);
        return res.status(HttpStatus.OK).json({
            msg: "وارد شدید",
            statusCode: HttpStatus.OK,
            token
        })
    }

    
}
