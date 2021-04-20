import { SetMetadata } from '@nestjs/common';
import { Role } from '../role/role.enum';

export const ROLES_KEY = 'Roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);