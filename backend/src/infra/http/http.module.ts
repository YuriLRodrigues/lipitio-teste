import { PlayersUseCasesModule } from 'src/domain/application/use-cases/players/players-use-cases.module';
import { PlayersController } from '../controller/players.controller';
import { Module } from '@nestjs/common';
import { TeamsUseCasesModule } from 'src/domain/application/use-cases/teams/teams-use-cases.module';
import { TeamsController } from '../controller/teams.controller';

@Module({
  imports: [PlayersUseCasesModule, TeamsUseCasesModule],
  controllers: [PlayersController, TeamsController],
})
export class HttpModule {}
