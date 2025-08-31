import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthRepository } from '../domain/auth.repository';
import { UserEntity } from 'src/modules/user/domain/user.entity';

@Injectable()
export class AuthTypeOrmRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repo.findOneBy({ email });
    return user;
  }
}
