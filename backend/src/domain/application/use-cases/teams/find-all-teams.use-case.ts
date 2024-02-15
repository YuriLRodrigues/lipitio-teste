import { Either, right } from 'src/core/logic/Either';

import { Injectable } from '@nestjs/common';

import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { TeamsRepository } from '../../repositories/teams.repository';

type Output = Either<Error, TeamsEntity[]>;

@Injectable()
export class FindAllTeamsUseCase {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async execute(): Promise<Output> {
    const teams = await this.teamsRepository.findAll();

    return right(teams);
  }
}
