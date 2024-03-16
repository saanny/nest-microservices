import { DynamicModule, Module } from '@nestjs/common';
import { TaskModule } from './application/task.module';
import { CoreModule } from './core/core.module';
import { TaskInfrastructureModule } from './infrastructure/task-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [CqrsModule.forRoot()],
  controllers: [],
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
