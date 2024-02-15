import { DatabaseModule } from 'src/infra/database/database.module';
import { UpdatePlayerUseCase } from './update-player.use-case';
import { FindAllPlayersUseCase } from './find-all-players.use-case';
import { DeletePlayerUseCase } from './delete-player.use-case';
import { CreatePlayerUseCase } from './create-player.use-case';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [
    UpdatePlayerUseCase,
    FindAllPlayersUseCase,
    DeletePlayerUseCase,
    CreatePlayerUseCase,
  ],
  exports: [
    UpdatePlayerUseCase,
    FindAllPlayersUseCase,
    DeletePlayerUseCase,
    CreatePlayerUseCase,
  ],
})
export class PlayersUseCasesModule {}
