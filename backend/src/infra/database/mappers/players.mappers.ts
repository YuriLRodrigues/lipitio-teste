import { Player, Prisma } from '@prisma/client';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';

export class PlayersMappers {
  static toDomain(data: Player): PlayersEntity {
    return PlayersEntity.create(
      {
        name: data.name,
        age: data.age,
        teamId: new UniqueEntityId(data.teamId),
      },
      new UniqueEntityId(data.id),
    );
  }

  static toPersistence(data: PlayersEntity): Prisma.PlayerCreateInput {
    return {
      id: data.id.toValue(),
      age: data.age,
      name: data.name,
      team: {
        connect: {
          id: data.teamId.toValue(),
        },
      },
    };
  }
}
