import { Controller, Post, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './schemas/service.schema';
import { ServicesService } from './services.service';

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
  create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }
}
