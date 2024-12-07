/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dti';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Response, Request } from 'express';
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) { }


    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(
        @Res() res: Response,
        @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
        const token = req.headers['authorization']?.split(' ')[1];
        const user = await this.userService.update(token, updateUserDto);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...newUser } = user;

        return res.status(HttpStatus.OK).json({
            msg: "کاربر ویرایش شد",
            statusCode: HttpStatus.OK,
            data: newUser
        });
    }

}
