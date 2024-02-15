import {
  CreatePlayerProps,
  DeletePlayerProps,
  FindPlayerByIdProps,
  FindPlayerByNameProps,
  PlayersRepository,
  UpdatePlayerProps,
} from 'src/domain/application/repositories/players.repository';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersMappers } from '../mappers/players.mappers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPlayersRepository implements PlayersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ player }: CreatePlayerProps): Promise<PlayersEntity> {
    const raw = PlayersMappers.toPersistence(player);

    const createdPlayer = await this.prismaService.player.create({
      data: raw,
    });

    return PlayersMappers.toDomain(createdPlayer);
  }

  async update({ player }: UpdatePlayerProps): Promise<PlayersEntity> {
    const raw = PlayersMappers.toPersistence(player);

    const updatedPlayer = await this.prismaService.player.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });

    return PlayersMappers.toDomain(updatedPlayer);
  }

  async delete({ id }: DeletePlayerProps): Promise<void> {
    await this.prismaService.player.delete({
      where: {
        id: id.toValue(),
      },
    });
  }

  async findAll(): Promise<PlayersEntity[]> {
    const allPlayers = await this.prismaService.player.findMany();

    const players = allPlayers.map((player) => PlayersMappers.toDomain(player));

    return players;
  }

  async findById({ id }: FindPlayerByIdProps): Promise<PlayersEntity> {
    const player = await this.prismaService.player.findFirst({
      where: {
        id: id.toValue(),
      },
    });

    return PlayersMappers.toDomain(player);
  }

  async findByName({ name }: FindPlayerByNameProps): Promise<PlayersEntity> {
    const player = await this.prismaService.player.findFirst({
      where: {
        name,
      },
    });

    if (!player) {
      return null;
    }

    return PlayersMappers.toDomain(player);
  }
}
