import { Either, left, right } from 'src/core/logic/Either';

import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../../repositories/teams.repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

type Output = Either<Error, TeamsEntity>;

type Input = {
  id: UniqueEntityId;
  name?: string;
};

@Injectable()
export class UpdateTeamUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute({ id, name }: Input): Promise<Output> {
    const teamExists = await this.teamsRepository.findById({ id });

    if (!teamExists) {
      return left(new Error('Team not found'));
    }

    const team = teamExists.editInfo({
      name,
    });

    const editedTeam = await this.teamsRepository.update({ team });

    return right(editedTeam);
  }
}
