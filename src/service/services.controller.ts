import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './schemas/service.schema';
import { ServicesService } from './services.service';
import { Request } from 'express';
import { SessionDto } from 'src/auth/dto/session.dto';

@UseGuards(JwtGuard, ACGuard)
@Controller('service')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseRoles({
    resource: 'service',
    action: 'create',
    possession: 'any',
  })
  @Post('create')
  create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() req: Request,
  ): Promise<Service> {
    const requestUser = req.user as SessionDto;
    return this.servicesService.create(createServiceDto, requestUser.id);
  }
}
