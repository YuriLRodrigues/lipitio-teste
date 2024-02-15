import {
  CreateTeamProps,
  DeleteTeamProps,
  FindTeamByIdProps,
  FindTeamByNameProps,
  TeamsRepository,
  UpdateTeamProps,
} from 'src/domain/application/repositories/teams.repository';
import { TeamsDetailsEntity } from 'src/domain/enterprise/team-details.entity';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

export class InMemoryTeamsRepository implements TeamsRepository {
  public teams: TeamsEntity[] = [];

  async create({ team }: CreateTeamProps): Promise<TeamsEntity> {
    this.teams.push(team);

    return team;
  }

  async update({ team }: UpdateTeamProps): Promise<TeamsEntity> {
    const index = this.teams.indexOf(team);

    this.teams[index] = team;
    return team;
  }

  async delete({ id }: DeleteTeamProps): Promise<void> {
    this.teams = this.teams.filter(
      (team) => team.id.toValue() !== id.toValue(),
    );

    return;
  }

  async findAll(): Promise<TeamsEntity[]> {
    return this.teams;
  }

  async findDetailsById({
    id,
  }: FindTeamByIdProps): Promise<TeamsDetailsEntity> {
    const team = this.teams.find((team) => team.id.toValue() === id.toValue());

    const teamDetails = TeamsDetailsEntity.create({
      name: team.name,
      players: [],
    });

    return teamDetails;
  }

  async findById({ id }: FindTeamByIdProps): Promise<TeamsEntity> {
    const team = this.teams.find((team) => team.id.toValue() === id.toValue());

    return team ?? null;
  }

  async findByName({ name }: FindTeamByNameProps): Promise<TeamsEntity> {
    const team = this.teams.find((team) => team.name === name);

    return team ?? null;
  }
}
