import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateCleanerDto, CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup.dto';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { MongoExceptionFilter } from 'src/utils/mongo-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseFilters(MongoExceptionFilter)
  @Post('signup')
  async signup(
    @Body() payload: CreateUserDto,
  ): Promise<SignupResponseDto | null> {
    return await this.authService.signup(payload);
  }

  @UseFilters(MongoExceptionFilter)
  @Post('signup-cleaner')
  async signupCleaner(
    @Body() payload: CreateCleanerDto,
  ): Promise<SignupResponseDto | null> {
    return await this.authService.signup(payload);
  }

  @Post('signin')
  @UseGuards(LocalGuard)
  async signin(@Req() req: Request) {
    return req.user;
  }
}
