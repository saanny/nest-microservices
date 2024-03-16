export class GetTasksQuery {
  constructor(
    public readonly limit: number,
    public readonly offset: number,
  ) {}
}
