import { UniqueEntityId } from '../../core/domain/entity/unique-id.entity';
import { TeamsDetailsEntity } from './team-details.entity';
import { TeamsEntity } from './team.entity';

describe('Team Details - Entity', () => {
  const team = TeamsEntity.create({
    name: 'Team test',
  });

  it('should be able to create a team with details', () => {
    const teamDetails = TeamsDetailsEntity.create(
      {
        name: 'Test Team',
        players: [],
      },
      team.id,
    );

    const players = Array.from({ length: 4 }).map((_, i) => ({
      id: new UniqueEntityId(String(i)),
      age: i,
      name: `Player ${i}`,
      teamId: team.id,
    }));

    teamDetails.players = players;

    expect(teamDetails.name).toEqual('Test Team');
    expect(teamDetails.id).toBeInstanceOf(UniqueEntityId);
    expect(teamDetails.players).toEqual(expect.arrayContaining(players));
  });
});
