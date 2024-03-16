import { Module } from '@nestjs/common';
import { AshlandController } from './ashland.controller';
import { AshlandService } from './ashland.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GALLATIN',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'gallatin_task_logs',
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'NASHVILLE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'nashville_task_logs',
          },
        }),
      },
    ]),
  ],
  controllers: [AshlandController],
  providers: [AshlandService],
})
export class AshlandModule {}
