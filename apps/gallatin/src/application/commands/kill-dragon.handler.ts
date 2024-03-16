import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KillDragonCommand } from './kill-dragon.command';
@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  async execute(command: KillDragonCommand) {
    console.log(command);
  }
}
