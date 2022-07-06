import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { LoginCredentialsDto } from 'src/dto/LoginCredentialsDto';
import { UserSubscribeDto } from 'src/dto/UserSubscribe.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(
    @Body() userData: UserSubscribeDto
  ) {
    return this.userService.register(userData);
  }

  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }

  @Get('all')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
