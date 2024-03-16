export class CreateTaskCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly parentId?: string,
  ) {}
}
