import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => TaskEntity, (task) => task.children)
  parentId: TaskEntity;

  @OneToMany(() => TaskEntity, (task) => task.parentId)
  children: TaskEntity[];
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;
}
