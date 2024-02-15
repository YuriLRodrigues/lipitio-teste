import { InMemoryTeamsRepository } from 'test/in-memory-teams-repository';
import { FindAllTeamsUseCase } from './find-all-teams.use-case';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

describe('FindAll Teams - Use Case', () => {
  let inMemoryTeamsRepository: InMemoryTeamsRepository;
  let sut: FindAllTeamsUseCase;

  beforeEach(() => {
    inMemoryTeamsRepository = new InMemoryTeamsRepository();
    sut = new FindAllTeamsUseCase(inMemoryTeamsRepository);

    const repeat = 10;

    for (let i = 0; i < repeat; i++) {
      const team = TeamsEntity.create({
        name: `Team-${i}`,
      });
      inMemoryTeamsRepository.create({ team });
    }
  });

  it('should be able to find all teams', async () => {
    const output = await sut.execute();

    expect(output.isRight()).toBe(true);
    expect(output.value).toHaveLength(10);
  });
});
