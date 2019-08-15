import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique } from 'typeorm';
import { Exclude } from 'class-transformer';

export type UserRole = 'admin' | 'user';

/**
 * User entity
 */
@Entity()
export class User {

  /**
   * Primary key id
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * name
   */
  @Column({ length: 100, nullable: false })
  name: string;

  /**
   * email
   */
  @Unique('email', ['email'])
  @Column({ length: 320, nullable: false })
  email: string;

  /**
   * password
   */
  @Exclude()
  @Column({ length: 100, nullable: false })
  password: string;

  /**
   * user activation status
   */
  @Column({ name: 'is_active' })
  isActive: boolean;

  /**
   * user roles: admin, user
   */
  @Column('simple-array')
  roles: UserRole[];

  /**
   * created at
   */
  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * updated at
   */
  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
