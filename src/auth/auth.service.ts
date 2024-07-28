import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private saltRounds = 12;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(payload: CreateUserDto) {
    const hashedPassowrd = await bcrypt.hash(payload.password, this.saltRounds);
    const data = { ...payload, password: hashedPassowrd };
    const user = await this.usersService.create(data);

    return {
      success: true,
      message: 'User created successfully',
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmailIncludePassword(email);

    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) return null;

    const payload = { sub: user._id, email: user.email, roles: user.roles };

    return await this.jwtService.signAsync(payload);
  }
}
