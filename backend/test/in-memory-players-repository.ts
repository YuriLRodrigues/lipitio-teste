import {
  CreatePlayerProps,
  DeletePlayerProps,
  FindPlayerByIdProps,
  FindPlayerByNameProps,
  PlayersRepository,
  UpdatePlayerProps,
} from 'src/domain/application/repositories/players.repository';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';

export class InMemoryPlayersRepository implements PlayersRepository {
  public players: PlayersEntity[] = [];

  async create({ player }: CreatePlayerProps): Promise<PlayersEntity> {
    this.players.push(player);

    return player;
  }

  async update({ player }: UpdatePlayerProps): Promise<PlayersEntity> {
    const index = this.players.indexOf(player);

    this.players[index] = player;
    return player;
  }

  async delete({ id }: DeletePlayerProps): Promise<void> {
    this.players = this.players.filter(
      (pl) => pl.id.toValue() !== id.toValue(),
    );

    return;
  }

  async findAll(): Promise<PlayersEntity[]> {
    return this.players;
  }

  async findById({ id }: FindPlayerByIdProps): Promise<PlayersEntity> {
    const player = this.players.find(
      (player) => player.id.toValue() === id.toValue(),
    );

    if (!player) return null;

    return player;
  }

  async findByName({ name }: FindPlayerByNameProps): Promise<PlayersEntity> {
    const player = this.players.find((player) => player.name === name);

    if (!player) return null;

    return player;
  }
}
