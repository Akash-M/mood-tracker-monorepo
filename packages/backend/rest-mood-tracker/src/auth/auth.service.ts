import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../db/entities/user.entity';
import * as bcrypt from 'bcrypt';

type UserResponse = Omit<UserEntity, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserResponse> {
    const user = await this.usersService.findUserForLogin(username);
    if (user) {
      if (await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new HttpException('Wrong password.', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException(
        'No user with username ' + username + ' found.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
