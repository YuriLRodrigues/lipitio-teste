import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { TeamsDetailsEntity } from 'src/domain/enterprise/team-details.entity';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

export type CreateTeamProps = {
  team: TeamsEntity;
};

export type UpdateTeamProps = {
  team: TeamsEntity;
};

export type DeleteTeamProps = {
  id: UniqueEntityId;
};

export type FindTeamByIdProps = {
  id: UniqueEntityId;
};

export type FindTeamByNameProps = {
  name: string;
};

export abstract class TeamsRepository {
  abstract create({ team }: CreateTeamProps): Promise<TeamsEntity>;
  abstract update({ team }: UpdateTeamProps): Promise<TeamsEntity>;
  abstract delete({ id }: DeleteTeamProps): Promise<void>;
  abstract findAll(): Promise<TeamsEntity[]>;
  abstract findDetailsById({
    id,
  }: FindTeamByIdProps): Promise<TeamsDetailsEntity>;
  abstract findById({ id }: FindTeamByIdProps): Promise<TeamsEntity>;
  abstract findByName({ name }: FindTeamByNameProps): Promise<TeamsEntity>;
}
