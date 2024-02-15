import { UniqueEntityId } from '../../core/domain/entity/unique-id.entity';
import { TeamsEntity } from './team.entity';

describe('Team - Entity', () => {
  it('should be able to create a team ', () => {
    const team = TeamsEntity.create(
      {
        name: 'Test Team',
      },
      new UniqueEntityId('123'),
    );

    expect(team.id).toBeInstanceOf(UniqueEntityId);
    expect(team.name).toBe('Test Team');
  });
});
