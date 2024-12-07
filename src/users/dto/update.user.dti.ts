/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    family: string

    @IsString()
    @IsOptional()
    @MinLength(5)
    password: string
}