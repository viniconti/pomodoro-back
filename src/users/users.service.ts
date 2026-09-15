import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatedUserDto } from './dto/updatedUserto';

interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOneInMemory(email: string): Promise<User | undefined> {
    return this.prismaService.user.find((user) => user.email === email);
  }

  async register(createUserDto: CreateUserDto) {
    const userAlreadyExistis = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userAlreadyExistis) throw new ConflictException('User already exists!');

    const user = await this.prismaService.user.create({
      data: createUserDto,
    });

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteById(id: string) {
    const deletedUser = this.prismaService.user.delete({
      where: {
        id: Number(id),
      },
    });

    return deletedUser;
  }

  async updateUser(id: string, updatedUserDto: UpdatedUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if(!user) throw new NotFoundException("User not found!");
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data: updatedUserDto,
    });

    return updatedUser;
  }

}
