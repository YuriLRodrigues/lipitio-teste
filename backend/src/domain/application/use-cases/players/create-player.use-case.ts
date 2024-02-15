import { Either, left, right } from 'src/core/logic/Either';
import { PlayersRepository } from '../../repositories/players.repository';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, PlayersEntity>;

type Input = {
  name: string;
  age: number;
  teamId: UniqueEntityId;
};

@Injectable()
export class CreatePlayerUseCase {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async execute({ age, name, teamId }: Input): Promise<Output> {
    const playerExists = await this.playersRepository.findByName({ name });

    if (playerExists) {
      return left(new Error('Player already exists'));
    }

    const player = PlayersEntity.create({
      age,
      name,
      teamId,
    });

    await this.playersRepository.create({ player });

    return right(player);
  }
}
