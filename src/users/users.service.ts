/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './enities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginStatusEntity } from './enities/user-login-status.entity';
import { MobileDto } from 'src/auth/dto/login-with-otp.dto';
import { SetPasswordDto } from 'src/auth/dto/set-password.dto';
import { UpdateUserDto } from './dto/update.user.dti';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserLoginStatusEntity)
    private readonly userLoginStatusRepository: Repository<UserLoginStatusEntity>,
    private readonly jwtService: JwtService
  ) { }

  async findOne(mobile: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { mobile: mobile } });
  }

  async create(mobile: string, verificationCode: string, token: string) {
    const newUser = await this.userRepository.create({ mobile });
    await this.userRepository.save(newUser);
    const userLoginStatus = await this.userLoginStatusRepository.create({
      user: newUser,
      verificationCode: verificationCode,
      token
    })
    await this.userLoginStatusRepository.save(userLoginStatus);
  }


  async createUserLoginStatus(user: UserEntity, verificationCode: string, token: string) {
    const userLoginStatus = await this.userLoginStatusRepository.create({
      user: user,
      verificationCode: verificationCode,
      token
    })
    await this.userLoginStatusRepository.save(userLoginStatus);
  }

  async getUserOtpCode(mobile: string) {
    const user = await this.userRepository.findOne({ where: { mobile: mobile } });

    const userLoginStatus = await this.userLoginStatusRepository.findOne({
      where: { user: user }, order: { created_at: "DESC" }
    });


    return userLoginStatus.verificationCode;
  }


  async checkUserHasPassword(mobileDto: MobileDto): Promise<boolean> {
    const user = await this.userRepository.findOne(
      { where: { mobile: mobileDto.mobile } }
    );
    return await !!user?.password;
  }



  async setUserPassword(mobileDto: MobileDto, passwordDto: SetPasswordDto): Promise<UserEntity> {

    const user = await this.userRepository.findOne({ where: { mobile: mobileDto.mobile } })

    if (!user) {
      throw new BadRequestException('کاربر پیدا نشد');
    }

    user.password = passwordDto.password;

    return await this.userRepository.save(user);

  }
  async update(token: string, updateUserDto: UpdateUserDto) {

    const decodedToken = await this.jwtService.verify(token);
    const user = await this.userRepository.findOne({ where: { mobile: decodedToken.mobile } })
    if (!user) {
      throw new BadRequestException("کاربر پیدا نشد");
    }

    user.name = updateUserDto.name;
    user.family = updateUserDto.family;
    user.password = updateUserDto.password

    return await this.userRepository.save(user);
  }

}
