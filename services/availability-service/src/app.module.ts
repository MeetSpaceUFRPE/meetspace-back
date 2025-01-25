import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReservationModule } from './reservation/reservation.module';

const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432'); 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    ReservationModule,
  ],
})
export class AppModule {}
