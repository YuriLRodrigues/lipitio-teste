import { Entity } from '../../core/domain/entity/entity';
import { UniqueEntityId } from '../../core/domain/entity/unique-id.entity';

type TeamsEntityProps = {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class TeamsEntity extends Entity<TeamsEntityProps> {
  get name() {
    return this.props.name;
  }

  get id() {
    return this._id;
  }

  public static create(props: TeamsEntityProps, id?: UniqueEntityId) {
    const teams = new TeamsEntity(
      {
        name: props.name,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return teams;
  }

  public editInfo(props: TeamsEntityProps) {
    this.props.name = props.name;

    this.props.updatedAt = new Date();

    return this;
  }
}
