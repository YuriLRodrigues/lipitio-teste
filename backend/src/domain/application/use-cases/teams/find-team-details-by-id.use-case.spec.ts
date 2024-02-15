import { InMemoryTeamsRepository } from 'test/in-memory-teams-repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { FindTeamDetailsByIdUseCase } from './find-team-details-by-id.use-case';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { InMemoryPlayersRepository } from 'test/in-memory-players-repository';

describe('FindAll Teams - Use Case', () => {
  let inMemoryTeamsRepository: InMemoryTeamsRepository;
  let inMemoryPlayersRepository: InMemoryPlayersRepository;
  let sut: FindTeamDetailsByIdUseCase;

  const team = TeamsEntity.create({
    name: 'Team 1',
  });

  const player = PlayersEntity.create({
    age: 18,
    name: 'Player 1',
    teamId: team.id,
  });

  beforeEach(() => {
    inMemoryTeamsRepository = new InMemoryTeamsRepository();
    inMemoryPlayersRepository = new InMemoryPlayersRepository();
    inMemoryTeamsRepository.create({ team });
    inMemoryPlayersRepository.create({ player });
    sut = new FindTeamDetailsByIdUseCase(inMemoryTeamsRepository);
  });

  it('should be able to find an team with details', async () => {
    const output = await sut.execute({
      id: team.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.objectContaining({
        name: team.name,
      }),
    );
  });
});
