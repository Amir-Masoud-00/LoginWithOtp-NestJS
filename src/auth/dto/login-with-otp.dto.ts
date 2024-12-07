/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches } from "class-validator";


export class MobileDto {
    @Matches(/^09\d{9}$/, { message: "شماره معتبر نیست" })
    @IsString({ message: 'فیلد موبایل عبور باید از نوع رشته باشد.' })
    @IsNotEmpty({ message: 'فیلد موبایل عبور نمی‌تواند خالی باشد.' })
    mobile: string;



}