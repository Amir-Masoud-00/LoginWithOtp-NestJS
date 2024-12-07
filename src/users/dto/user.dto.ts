/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class UserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    famiy: string;

    @IsNotEmpty()
    @MaxLength(11)
    @MinLength(11)
    mobile: string

    @IsOptional()
    @IsString()
    @MinLength(5)
    password: string
}