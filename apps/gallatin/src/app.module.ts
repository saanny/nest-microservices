import { DynamicModule, Module } from '@nestjs/common';
import { TaskModule } from './task/application/task.module';
import { TaskInfrastructureModule } from './task/infrastructure/task-infrastructure.module';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test/test.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
  ],
  controllers: [TestController],
  providers: [],
})
export class AppModule {
  static register(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(),
        TaskModule.withInfrastructure(TaskInfrastructureModule.use()),
      ],
    };
  }
}
