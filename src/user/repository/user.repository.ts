import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable, Inject } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
