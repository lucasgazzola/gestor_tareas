// src/modules/auth/domain/auth.repository.ts
import { UserEntity } from 'src/modules/user/domain/user.entity';

export abstract class AuthRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
