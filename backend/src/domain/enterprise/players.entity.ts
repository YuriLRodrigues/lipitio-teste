import { Entity } from '../../core/domain/entity/entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';

export type PlayersEntityProps = {
  name: string;
  age: number;
  teamId: UniqueEntityId;
  createdAt?: Date;
  updatedAt?: Date;
};

type EditPlayerInfo = {
  name?: string;
  age?: number;
  teamId?: UniqueEntityId;
};

export class PlayersEntity extends Entity<PlayersEntityProps> {
  get name() {
    return this.props.name;
  }

  get age() {
    return this.props.age;
  }

  get teamId() {
    return this.props.teamId;
  }

  get id() {
    return this._id;
  }

  public static create(props: PlayersEntityProps, id?: UniqueEntityId) {
    const player = new PlayersEntity(
      {
        name: props.name,
        age: props.age,
        teamId: props.teamId,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return player;
  }

  public editInfo({ age, name, teamId }: EditPlayerInfo) {
    this.props.age = age ?? this.props.age;
    this.props.name = name ?? this.props.name;
    this.props.teamId = teamId ?? this.props.teamId;

    this.props.updatedAt = new Date();

    return this;
  }
}
