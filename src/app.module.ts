import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { RBAC_POLICY } from './auth/rbac-policy';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_HOST'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AccessControlModule.forRoles(RBAC_POLICY),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
