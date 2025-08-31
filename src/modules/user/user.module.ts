import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './domain/user.entity';
import { UserRepository } from './domain/user.repository';
import { UserTypeOrmRepository } from './infrastructure/user.typeorm.repository';
import { UserController } from './infrastructure/user.controller';
import { RegisterUseCase } from './application/register.user-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    {
      provide: UserRepository, // Token: interfaz/abstract class
      useClass: UserTypeOrmRepository, // Implementación concreta
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
