import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskRepository } from 'apps/gallatin/src/application/ports/task.repository';
import { OrmTaskRepository } from './repositories/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [
    {
      provide: TaskRepository,
      useClass: OrmTaskRepository,
    },
  ],
  exports: [TaskRepository],
})
export class OrmTaskPersistenceModule {}
