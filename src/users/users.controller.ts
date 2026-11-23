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
import { UpdatedUserDto } from './dto/updatedUserto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.usersService.deleteById(id)
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateUser
  (@Param('id') id: string,
  @Body() updatedUserDto: UpdatedUserDto,
) {
    return this.usersService.updateUser(id, updatedUserDto);
  }
}
