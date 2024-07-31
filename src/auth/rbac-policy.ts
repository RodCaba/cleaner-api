import { RolesBuilder } from 'nest-access-control';
import { Roles } from './enums/roles';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

RBAC_POLICY.grant(Roles.USER)
  .readOwn('profile')
  .updateOwn('profile')
  .deleteOwn('profile')
  .createAny('service');
