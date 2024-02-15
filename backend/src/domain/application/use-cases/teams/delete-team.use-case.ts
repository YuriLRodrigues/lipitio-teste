import { Either, left, right } from 'src/core/logic/Either';

import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../../repositories/teams.repository';

type Output = Either<Error, void>;
type Input = {
  id: UniqueEntityId;
};

@Injectable()
export class DeleteTeamUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const teamExists = await this.teamsRepository.findById({ id });

    if (!teamExists) {
      return left(new Error('Team not found'));
    }

    await this.teamsRepository.delete({ id });

    return right(null);
  }
}
