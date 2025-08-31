import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsPasswordsMatching } from 'src/shared/decorators/ispasswordmatching.decorator';

export class RegisterDto {
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(100, {
    message: 'La contraseña no puede tener más de 100 caracteres',
  })
  password: string;

  @IsPasswordsMatching('password', {
    message: 'Las contraseñas deben coincidir',
  })
  confirmPassword: string;
}
