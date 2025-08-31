import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../domain/user.repository';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userEntity = await this.repo.findOne({ where: { email } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userEntity = await this.repo.findOne({ where: { id } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const entity = this.repo.create(this.toPersistence(user));
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    await this.repo.update(user.id!, this.toPersistence(user));
    const updated = await this.repo.findOne({ where: { id: user.id } });
    if (!updated) throw new Error('No se pudo actualizar el usuario');
    return this.toDomain(updated);
  }

  async delete(id: string): Promise<UserEntity['id']> {
    await this.repo.delete(id);
    return id;
  }

  // Convertir entidad de dominio a persistencia
  private toPersistence(user: UserEntity): Partial<UserEntity> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  // Convertir entidad de persistencia a dominio
  private toDomain(entity: UserEntity): UserEntity {
    const user = new UserEntity();
    user.id = entity.id;
    user.name = entity.name;
    user.email = entity.email;
    user.password = entity.password;
    return user;
  }
}
