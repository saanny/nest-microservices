export class TaskManager {
  constructor(
    public id: string,
    public parentId: string | null,
    public title: string,
    public description: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
