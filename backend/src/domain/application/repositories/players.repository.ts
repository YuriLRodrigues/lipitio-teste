import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';

export type CreatePlayerProps = {
  player: PlayersEntity;
};

export type UpdatePlayerProps = {
  player: PlayersEntity;
};

export type DeletePlayerProps = {
  id: UniqueEntityId;
};

export type FindPlayerByIdProps = {
  id: UniqueEntityId;
};

export type FindPlayerByNameProps = {
  name: string;
};

export abstract class PlayersRepository {
  abstract create({ player }: CreatePlayerProps): Promise<PlayersEntity>;
  abstract update({ player }: UpdatePlayerProps): Promise<PlayersEntity>;
  abstract delete({ id }: DeletePlayerProps): Promise<void>;
  abstract findAll(): Promise<PlayersEntity[]>;
  abstract findById({ id }: FindPlayerByIdProps): Promise<PlayersEntity>;
  abstract findByName({ name }: FindPlayerByNameProps): Promise<PlayersEntity>;
}
