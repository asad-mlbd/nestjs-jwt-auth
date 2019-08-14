import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/user.entity';

/**
 * User repository class
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
