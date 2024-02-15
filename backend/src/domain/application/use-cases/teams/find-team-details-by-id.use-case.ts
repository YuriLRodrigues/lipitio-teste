import { Either, left, right } from 'src/core/logic/Either';
import { TeamsRepository } from '../../repositories/teams.repository';
import { TeamsDetailsEntity } from 'src/domain/enterprise/team-details.entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { Injectable } from '@nestjs/common';

type Output = Either<Error, TeamsDetailsEntity>;

type Input = {
  id: UniqueEntityId;
};

@Injectable()
export class FindTeamDetailsByIdUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute({ id }: Input): Promise<Output> {
    const teamExists = await this.teamsRepository.findDetailsById({ id });

    if (!teamExists) {
      return left(new Error('Team not found'));
    }

    return right(teamExists);
  }
}
