import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateTeamProps,
  DeleteTeamProps,
  FindTeamByIdProps,
  FindTeamByNameProps,
  TeamsRepository,
  UpdateTeamProps,
} from 'src/domain/application/repositories/teams.repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { TeamsMappers } from '../mappers/teams.mappers';
import { TeamsDetailsEntity } from 'src/domain/enterprise/team-details.entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';

@Injectable()
export class PrismaTeamsRepository implements TeamsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ team }: CreateTeamProps): Promise<TeamsEntity> {
    const raw = TeamsMappers.toPersistence(team);

    const createdTeam = await this.prismaService.team.create({
      data: raw,
    });

    return TeamsMappers.toDomain(createdTeam);
  }

  async update({ team }: UpdateTeamProps): Promise<TeamsEntity> {
    const raw = TeamsMappers.toPersistence(team);

    const updatedTeam = await this.prismaService.team.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return TeamsMappers.toDomain(updatedTeam);
  }

  async delete({ id }: DeleteTeamProps): Promise<void> {
    await this.prismaService.team.delete({
      where: {
        id: id.toValue(),
      },
    });

    return;
  }

  async findAll(): Promise<TeamsEntity[]> {
    const allTeams = await this.prismaService.team.findMany();

    const teams = allTeams.map((team) => TeamsMappers.toDomain(team));

    return teams;
  }

  async findById({ id }: FindTeamByIdProps): Promise<TeamsEntity> {
    const team = await this.prismaService.team.findFirst({
      where: {
        id: id.toValue(),
      },
    });

    if (!team) {
      return null;
    }

    return TeamsMappers.toDomain(team);
  }

  async findDetailsById({
    id,
  }: FindTeamByIdProps): Promise<TeamsDetailsEntity> {
    const team = await this.prismaService.team.findFirst({
      where: {
        id: id.toValue(),
      },
      select: {
        id: true,
        name: true,
        players: true,
        createdAt: true,
      },
    });

    if (!team) {
      return null;
    }

    return TeamsDetailsEntity.create(
      {
        name: team.name,
        players: team.players.map((player) => ({
          id: new UniqueEntityId(player.id),
          teamId: new UniqueEntityId(player.teamId),
          age: player.age,
          name: player.name,
        })),
        createdAt: team.createdAt,
      },
      new UniqueEntityId(team.id),
    );
  }

  async findByName({ name }: FindTeamByNameProps): Promise<TeamsEntity> {
    const team = await this.prismaService.team.findFirst({
      where: {
        name,
      },
    });

    if (!team) {
      return null;
    }

    return TeamsMappers.toDomain(team);
  }
}
