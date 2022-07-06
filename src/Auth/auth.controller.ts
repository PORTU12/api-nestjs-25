import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

import { UserDto } from "src/dto/create-user.dto";
import { AuthEntity } from "src/entities/Auth.entity";
import { AuthService } from "./auth.service";


@Controller('auteur')
export class AuthController {
  constructor(private userService: AuthService) { }
  
  @Get()
  async getAll(): Promise<AuthEntity[]> {
    return this.userService.findAll()
  }
  @Post()
  async createUser(@Body() newUser: UserDto): Promise<AuthEntity>{
    return this.userService.create(newUser)
  }
  @Get(':id')
  async getOne(@Param() id: number): Promise<AuthEntity>{
    return this.userService.getById(id)
  }
  @Put(':id')
  async UpdateUser(@Param('id') id: number, @Body() userdto: UserDto): Promise<AuthEntity>{
    return this.userService.update(id, userdto)
  }
  @Delete(':id')
  async DeleteUser(@Param('id') id: number): Promise<AuthEntity>{
    return this.userService.delete(id)
  }
}