import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './schemas/service.schema';
import { ServicesService } from './services.service';
import { Request } from 'express';
import { SessionDto } from 'src/auth/dto/session.dto';
import { ServiceOverlapError } from './schemas/errors.schema';

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
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() req: Request,
  ): Promise<Service> {
    try {
      const requestUser = req.user as SessionDto;
      return await this.servicesService.create(
        createServiceDto,
        requestUser.id,
      );
    } catch (error) {
      if (error instanceof ServiceOverlapError) {
        throw new HttpException(
          {
            status: error.status,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
