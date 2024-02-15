import { Either, left, right } from 'src/core/logic/Either';
import { PlayersRepository } from '../../repositories/players.repository';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, void>;
type Input = {
  id: UniqueEntityId;
};

@Injectable()
export class DeletePlayerUseCase {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const playerExists = await this.playersRepository.findById({ id });

    if (!playerExists) {
      return left(new Error('Player not found'));
    }

    await this.playersRepository.delete({ id });

    return right(null);
  }
}
