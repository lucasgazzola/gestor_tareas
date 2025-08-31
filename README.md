# Gestor Administrativo

Este proyecto es un **prototipo de una aplicación para la gestión de tareas**, desarrollado con [NestJS](https://nestjs.com/) y utilizando **Domain-Driven Design (DDD)** como enfoque principal de arquitectura.

Actualmente, el sistema implementa únicamente la funcionalidad de **autenticación de usuarios** (registro e inicio de sesión). El objetivo es servir como base para futuras ampliaciones, como la gestión de proyectos, tareas y usuarios, siguiendo buenas prácticas de diseño y separación de responsabilidades.

## Características principales

- **Autenticación de usuarios** (registro e inicio de sesión)
- Arquitectura basada en **DDD** (Domain-Driven Design)
- Uso de **TypeORM** y base de datos PostgreSQL
- Estructura modular y escalable

## Estructura del proyecto

```
src/
  modules/
    auth/         # Módulo de autenticación
    user/         # Módulo de usuarios
  shared/         # Decoradores, excepciones, utilidades
```

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Configura tu base de datos PostgreSQL (ver `src/app.module.ts` para los datos de conexión por defecto).
3. Ejecuta la aplicación:
   ```bash
   npm run start:dev
   ```

## Notas

- Este proyecto es solo un prototipo inicial y está en desarrollo.
- Próximamente se agregarán módulos para la gestión de tareas y proyectos.

---

Desarrollado por Lucas · 2025
