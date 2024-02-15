import { InMemoryPlayersRepository } from '../../../../../test/in-memory-players-repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { UpdatePlayerUseCase } from './update-player.use-case';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';

describe('Update Player - Use Case', () => {
  let InMemoryPlayersRepository: InMemoryPlayersRepository;
  let sut: UpdatePlayerUseCase;

  const team = TeamsEntity.create({
    name: 'Test Team',
  });

  const player = PlayersEntity.create({
    age: 18,
    name: 'John',
    teamId: team.id,
  });

  beforeEach(() => {
    InMemoryPlayersRepository = new InMemoryPlayersRepository();
    InMemoryPlayersRepository.create({ player });
    sut = new UpdatePlayerUseCase(InMemoryPlayersRepository);
  });

  it('should be able to update an player', async () => {
    const output = await sut.execute({
      id: player.id,
      age: 20,
      name: 'New name',
    });

    expect(output.isRight()).toBe(true);
    expect(output.value.name).toBe('New name');
  });

  it('not should be able to update an player', async () => {
    const output = await sut.execute({
      id: new UniqueEntityId('12345'),
      age: 20,
      name: 'New name',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Player not found'));
  });
});
