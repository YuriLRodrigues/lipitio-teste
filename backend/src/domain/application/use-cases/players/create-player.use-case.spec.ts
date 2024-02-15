import { InMemoryPlayersRepository } from '../../../../../test/in-memory-players-repository';
import { CreatePlayerUseCase } from './create-player.use-case';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';

describe('Create Player - Use Case', () => {
  let InMemoryPlayersRepository: InMemoryPlayersRepository;
  let sut: CreatePlayerUseCase;
  const team = TeamsEntity.create({
    name: 'Test Team',
  });

  beforeEach(() => {
    InMemoryPlayersRepository = new InMemoryPlayersRepository();
    sut = new CreatePlayerUseCase(InMemoryPlayersRepository);
  });

  it('should be able to create an player', async () => {
    const output = await sut.execute({
      age: 18,
      name: 'John',
      teamId: team.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value).toEqual(
      expect.objectContaining({ age: 18, name: 'John', teamId: team.id }),
    );
  });

  it('not should be able to create an player with an existing name', async () => {
    await sut.execute({
      age: 18,
      name: 'John',
      teamId: team.id,
    });

    const output = await sut.execute({
      age: 20,
      name: 'John',
      teamId: team.id,
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Player already exists'));
  });
});
