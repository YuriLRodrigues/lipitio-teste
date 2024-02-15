import { Either, left, right } from 'src/core/logic/Either';
import { PlayersRepository } from '../../repositories/players.repository';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, PlayersEntity>;
type Input = {
  id: UniqueEntityId;
  age?: number;
  name?: string;
  teamId?: UniqueEntityId;
};

@Injectable()
export class UpdatePlayerUseCase {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async execute({ id, age, name, teamId }: Input): Promise<Output> {
    const playerExists = await this.playersRepository.findById({ id });

    if (!playerExists) {
      return left(new Error('Player not found'));
    }

    const player = playerExists.editInfo({
      age,
      name,
      teamId,
    });

    const editedPlayer = await this.playersRepository.update({ player });

    return right(editedPlayer);
  }
}
