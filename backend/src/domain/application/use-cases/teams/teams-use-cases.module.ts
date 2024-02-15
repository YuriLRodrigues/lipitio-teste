import { DatabaseModule } from 'src/infra/database/database.module';

import { Module } from '@nestjs/common';
import { UpdateTeamUseCase } from './update-team.use-case';
import { FindAllTeamsUseCase } from './find-all-teams.use-case';
import { DeleteTeamUseCase } from './delete-team.use-case';
import { CreateTeamUseCase } from './create-team.use-case';
import { FindTeamDetailsByIdUseCase } from './find-team-details-by-id.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    UpdateTeamUseCase,
    FindAllTeamsUseCase,
    DeleteTeamUseCase,
    CreateTeamUseCase,
    FindTeamDetailsByIdUseCase,
  ],
  exports: [
    UpdateTeamUseCase,
    FindAllTeamsUseCase,
    DeleteTeamUseCase,
    CreateTeamUseCase,
    FindTeamDetailsByIdUseCase,
  ],
})
export class TeamsUseCasesModule {}
