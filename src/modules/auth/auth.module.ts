import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './infrastructure/auth.controller';
import { AuthTypeOrmRepository } from './infrastructure/auth.typeorm.repository';
import { AuthRepository } from './domain/auth.repository';
import { LoginUseCase } from './application/login.use-case';
import { UserEntity } from '../user/domain/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    {
      provide: AuthRepository,
      useClass: AuthTypeOrmRepository,
    },
  ],
})
export class AuthModule {}
