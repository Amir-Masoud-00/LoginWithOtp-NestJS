/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SetPasswordDto {

    @MinLength(4)
    @IsString({ message: 'فیلد رمز عبور باید از نوع رشته باشد.' })
    @IsNotEmpty({ message: 'فیلد رمز عبور نمی‌تواند خالی باشد.' })
    password: string
}