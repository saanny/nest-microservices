import { Column, Entity, PrimaryColumn, Tree, TreeParent } from 'typeorm';

@Entity('tasks')
@Tree('nested-set')
export class TaskEntity {
  @PrimaryColumn('uuid')
  id: string;

  @TreeParent()
  parentId: TaskEntity;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;
}
