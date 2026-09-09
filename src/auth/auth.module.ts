import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],

  providers: [
    AuthService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],

  controllers: [AuthController],

  exports: [AuthService],
})
export class AuthModule {}