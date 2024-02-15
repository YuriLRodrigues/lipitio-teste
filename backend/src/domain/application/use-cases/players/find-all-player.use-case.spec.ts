import { InMemoryPlayersRepository } from '../../../../../test/in-memory-players-repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { FindAllPlayersUseCase } from './find-all-players.use-case';

describe('FindAll Players - Use Case', () => {
  let InMemoryPlayersRepository: InMemoryPlayersRepository;
  let sut: FindAllPlayersUseCase;

  const team = TeamsEntity.create({
    name: 'Test Team',
  });

  beforeEach(() => {
    InMemoryPlayersRepository = new InMemoryPlayersRepository();
    sut = new FindAllPlayersUseCase(InMemoryPlayersRepository);

    const repeat = 10;

    for (let i = 0; i < repeat; i++) {
      const player = PlayersEntity.create({
        age: i,
        name: `Player-${i}`,
        teamId: team.id,
      });
      InMemoryPlayersRepository.create({ player });
    }
  });

  it('should be able to find all players', async () => {
    const output = await sut.execute();

    expect(output.isRight()).toBe(true);
    expect(output.value).toHaveLength(10);
  });
});
