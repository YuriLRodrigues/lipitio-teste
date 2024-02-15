import { InMemoryPlayersRepository } from '../../../../../test/in-memory-players-repository';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { DeletePlayerUseCase } from './delete-player.use-case';
import { PlayersEntity } from 'src/domain/enterprise/players.entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';

describe('Delete Player - Use Case', () => {
  let inMemoryPlayersRepository: InMemoryPlayersRepository;
  let sut: DeletePlayerUseCase;

  const team = TeamsEntity.create({
    name: 'Test Team',
  });

  const player = PlayersEntity.create({
    age: 18,
    name: 'John',
    teamId: team.id,
  });

  beforeEach(() => {
    inMemoryPlayersRepository = new InMemoryPlayersRepository();
    inMemoryPlayersRepository.create({ player });
    sut = new DeletePlayerUseCase(inMemoryPlayersRepository);
  });

  it('should be able to delete an player', async () => {
    const output = await sut.execute({
      id: player.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value);
  });

  it('not should be able to delete an player with an non-existent id', async () => {
    const output = await sut.execute({
      id: new UniqueEntityId('12345'),
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Player not found'));
  });
});
