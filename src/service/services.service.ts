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
  async create(createServiceDto: CreateServiceDto, userId: string) {
    const overlapService = await this.serviceModel.findOne({
      cleanerId: createServiceDto.cleanerId,
      $or: [
        {
          startDateTime: {
            $gte: createServiceDto.startDateTime,
            $lte: createServiceDto.endDateTime,
          },
        },
        {
          endDateTime: {
            $gte: createServiceDto.startDateTime,
            $lte: createServiceDto.endDateTime,
          },
        },
      ],
    });

    if (overlapService) {
      throw new Error('Service time is overlapped');
    }

    const createdService = new this.serviceModel({
      ...createServiceDto,
      userId,
    });
    return await createdService.save();
  }
}
