import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(100, {
    message: 'La contraseña no puede tener más de 100 caracteres',
  })
  password: string;
}
