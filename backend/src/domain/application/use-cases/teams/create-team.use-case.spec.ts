import { InMemoryTeamsRepository } from 'test/in-memory-teams-repository';
import { CreateTeamUseCase } from './create-team.use-case';

describe('Create Team - Use Case', () => {
  let inMemoryTeamsRepository: InMemoryTeamsRepository;
  let sut: CreateTeamUseCase;

  beforeEach(() => {
    inMemoryTeamsRepository = new InMemoryTeamsRepository();
    sut = new CreateTeamUseCase(inMemoryTeamsRepository);
  });

  it('should be able to create an team', async () => {
    const output = await sut.execute({
      name: 'Team 1',
    });

    expect(output.isRight()).toBe(true);
    expect(output.value.name).toEqual('Team 1');
  });

  it('not should be able to create an team with an existing name', async () => {
    await sut.execute({
      name: 'Team old',
    });

    const output = await sut.execute({
      name: 'Team old',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Team already exists'));
  });
});
