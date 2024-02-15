import { Either, left, right } from 'src/core/logic/Either';
import { Injectable } from '@nestjs/common';
import { TeamsRepository } from '../../repositories/teams.repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

type Output = Either<Error, TeamsEntity>;

type Input = {
  name: string;
};

@Injectable()
export class CreateTeamUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute({ name }: Input): Promise<Output> {
    const teamExists = await this.teamsRepository.findByName({ name });

    if (teamExists) {
      return left(new Error('Team already exists'));
    }

    const team = TeamsEntity.create({
      name,
    });

    await this.teamsRepository.create({ team });

    return right(team);
  }
}
