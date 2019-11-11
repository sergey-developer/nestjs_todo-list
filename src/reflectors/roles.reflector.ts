import { SetMetadata } from '@nestjs/common';

export const RolesReflector = (roles: string[]) => SetMetadata('roles', roles);
