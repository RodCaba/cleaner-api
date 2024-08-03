import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const createdService = new this.serviceModel(createServiceDto);
    return await createdService.save();
  }
}
