import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/public.decorator';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route created to create an user an register them in the database
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  // Route created to return all users registered in the database
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }



  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Put('users/update:id')
  // updateUser(
  //   @Param('id') id: string,
  //   @Body() UpdatedUserDto: UpdatedUserDto
  // ) {
  //   return this.usersService.updateUser(
  //     id,
  //     UpdatedUserDto,
  //   );
  // }
}
