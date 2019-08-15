
/**
 * type user roles
 */
export type UserRole =  'user' | 'admin';

/**
 * Auth user interface
 */
export interface IAuthUser {
  /**
   * usre id
   */
  id: number;

  /**
   * user email
   */
  email: string;

  /**
   * optional user name
   */
  name ?: string;

  /**
   * user roles array
   */
  roles: [UserRole];
}
