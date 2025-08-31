import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/domain/user.entity';

@Module({
  imports: [
    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'gestor_tareas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // ✅ incluye todas las entidades
      synchronize: true,
    }),

    // Módulos de la aplicación
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
