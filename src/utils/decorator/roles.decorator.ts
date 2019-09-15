import { SetMetadata } from '@nestjs/common';
/**
 * Decorator to set required user role as meta data
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
