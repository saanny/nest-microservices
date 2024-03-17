import { Module } from '@nestjs/common';
import { AshlandController } from '../presenters/rabbitmq/logger.controller';
import { AshlandService } from './logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AshlandController],
  providers: [AshlandService],
})
export class LoggerModule {}
