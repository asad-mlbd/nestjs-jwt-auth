import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn, 
  Unique } from 'typeorm';

export type UserRole = 'admin' | 'user';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Unique('email', ['email'])
  @Column({ length: 320, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column('simple-array')
  roles: UserRole[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
