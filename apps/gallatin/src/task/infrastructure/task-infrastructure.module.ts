import { Module } from '@nestjs/common';
import { OrmTaskPersistenceModule } from './persistance/orm/orm-persistence.module';

@Module({})
export class TaskInfrastructureModule {
  //   we can add drive here
  static use() {
    const persistanceModule = OrmTaskPersistenceModule;

    return {
      module: TaskInfrastructureModule,
      imports: [persistanceModule],
      exports: [persistanceModule],
    };
  }
}
