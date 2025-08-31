import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../domain/user.repository';
import { RegisterDto } from './dtos/register.dto';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: RegisterDto): Promise<{ userId: string; email: string }> {
    try {
      // Verificar si el email ya existe
      const existingUser = await this.userRepo.findByEmail(dto.email);
      if (existingUser) {
        throw new BadRequestException('El email ya está registrado');
      }

      // Hashear la contraseña
      const passwordHash = await bcrypt.hash(dto.password, 10);

      // Crear entidad de dominio
      const user = new UserEntity({
        name: dto.name,
        email: dto.email,
        password: passwordHash,
      });

      // Guardar en el repositorio
      const savedUser = await this.userRepo.save(user);

      // Devolver datos mínimos
      return { userId: savedUser.id!, email: savedUser.email };
    } catch (err) {
      // Captura cualquier error inesperado y lo convierte en BadRequestException
      throw new BadRequestException(
        err.message || 'Error al registrar el usuario',
      );
    }
  }
}
