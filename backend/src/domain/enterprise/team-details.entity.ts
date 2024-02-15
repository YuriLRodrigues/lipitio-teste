import { Entity } from '../../core/domain/entity/entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
type PlayerProps = {
  id: UniqueEntityId;
  name: string;
  age: number;
  teamId: UniqueEntityId;
};

type TeamsDetailsEntityProps = {
  name: string;
  createdAt?: Date;
  players: Array<PlayerProps>;
};

export class TeamsDetailsEntity extends Entity<TeamsDetailsEntityProps> {
  get name() {
    return this.props.name;
  }

  get id() {
    return this._id;
  }

  get players() {
    return this.props.players;
  }

  set players(players: Array<PlayerProps>) {
    this.props.players = players;
  }

  public static create(props: TeamsDetailsEntityProps, id?: UniqueEntityId) {
    const teams = new TeamsDetailsEntity(
      {
        name: props.name,
        players: props.players,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return teams;
  }
}
