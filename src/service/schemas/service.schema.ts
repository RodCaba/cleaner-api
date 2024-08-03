import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Status } from '../enums/status';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  startDateTime: Date;

  @Prop({ required: true })
  endDateTime: Date;

  @Prop({ required: true, type: String, enum: Status, default: Status.PENDING })
  status: Status;

  @Prop({ required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  cleanerId: MongooseSchema.Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
