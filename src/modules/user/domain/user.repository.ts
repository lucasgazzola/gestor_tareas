import { UserEntity } from './user.entity';

export abstract class UserRepository {
  /**
   * Busca un usuario por su email
   * @param email Email del usuario
   * @returns UserEntity o null si no existe
   */
  abstract findByEmail(email: string): Promise<UserEntity | null>;

  /**
   * Busca un usuario por su ID
   * @param id ID del usuario
   * @returns UserEntity o null si no existe
   */
  abstract findById(id: string): Promise<UserEntity | null>;

  /**
   * Persiste un usuario en la base de datos
   * @param UserEntity Usuario a guardar
   */
  abstract save(UserEntity: UserEntity): Promise<UserEntity>;

  /**
   * Actualiza un usuario existente
   * @param UserEntity Usuario actualizado
   */
  abstract update(UserEntity: UserEntity): Promise<UserEntity>;

  /**
   * Elimina un usuario por su ID
   * @param id ID del usuario
   */
  abstract delete(id: string): Promise<UserEntity['id']>;
}
