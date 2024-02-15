import { Prisma, Teams } from '@prisma/client';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

export class TeamsMappers {
  static toDomain(data: Teams): TeamsEntity {
    return TeamsEntity.create(
      {
        name: data.name,
      },
      new UniqueEntityId(data.id),
    );
  }

  static toPersistence(data: TeamsEntity): Prisma.TeamsCreateInput {
    return {
      id: data.id.toValue(),
      name: data.name,
    };
  }
}
