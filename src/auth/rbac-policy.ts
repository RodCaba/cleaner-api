import { RolesBuilder } from 'nest-access-control';
import { Roles } from './enums/roles';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();
RBAC_POLICY.grant(Roles.CLEANER).readOwn('service');
RBAC_POLICY.grant(Roles.USER)
  .extend(Roles.CLEANER)
  .readOwn('profile')
  .updateOwn('profile')
  .deleteOwn('profile')
  .createAny('service');
RBAC_POLICY.grant(Roles.ADMIN).extend(Roles.USER);
