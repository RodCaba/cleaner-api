import { Controller, Post, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard, ACGuard)
@Controller('service')
export class ServicesController {
  constructor() {}

  @UseRoles({
    resource: 'service',
    action: 'create',
    possession: 'any',
  })
  @Post('create')
  async create() {
    return 'Service created successfully';
  }
}
