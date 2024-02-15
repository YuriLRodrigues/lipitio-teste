import { Either, right } from 'src/core/logic/Either';
import { PlayersRepository } from '../../repositories/players.repository';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, PlayersEntity[]>;

@Injectable()
export class FindAllPlayersUseCase {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async execute(): Promise<Output> {
    const players = await this.playersRepository.findAll();

    return right(players);
  }
}
