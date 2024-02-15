import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaPlayersRepository } from './repositories/prisma-players-repository';
import { PlayersRepository } from 'src/domain/application/repositories/players.repository';
import { TeamsRepository } from 'src/domain/application/repositories/teams.repository';
import { PrismaTeamsRepository } from './repositories/prisma-teams-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: PlayersRepository,
      useClass: PrismaPlayersRepository,
    },
    {
      provide: TeamsRepository,
      useClass: PrismaTeamsRepository,
    },
  ],
  exports: [PrismaService, PlayersRepository, TeamsRepository],
})
export class DatabaseModule {}
