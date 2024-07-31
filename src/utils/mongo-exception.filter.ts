import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    switch (exception.code) {
      case 11000:
        return response.status(409).json({
          statusCode: 409,
          message: exception.message,
        });
      default:
        return response.status(500).json({
          statusCode: 500,
          message: 'Internal server error',
        });
    }
  }
}
