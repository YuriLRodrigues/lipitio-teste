import { InMemoryTeamsRepository } from 'test/in-memory-teams-repository';
import { DeleteTeamUseCase } from './delete-team.use-case';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';

describe('Delete Team - Use Case', () => {
  let inMemoryTeamsRepository: InMemoryTeamsRepository;
  let sut: DeleteTeamUseCase;

  const team = TeamsEntity.create({
    name: 'Test Team',
  });

  beforeEach(() => {
    inMemoryTeamsRepository = new InMemoryTeamsRepository();
    inMemoryTeamsRepository.create({ team });

    sut = new DeleteTeamUseCase(inMemoryTeamsRepository);
  });

  it('should be able to delete an team', async () => {
    const output = await sut.execute({
      id: team.id,
    });

    expect(output.isRight()).toBe(true);
    expect(output.value);
  });

  it('not should be able to delete an team with an non-existent id', async () => {
    const output = await sut.execute({
      id: new UniqueEntityId('12345'),
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Team not found'));
  });
});
