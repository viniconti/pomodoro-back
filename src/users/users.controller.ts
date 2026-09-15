import {
  Body,
  Controller,
  Delete,
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

  // Route created to register an user in the database
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
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

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(id)
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
