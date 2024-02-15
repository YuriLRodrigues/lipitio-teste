import { InMemoryTeamsRepository } from 'test/in-memory-teams-repository';
import { UpdateTeamUseCase } from './update-team.use-case';
import { TeamsEntity } from 'src/domain/enterprise/team.entity';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';

describe('Update Team - Use Case', () => {
  let inMemoryTeamsRepository: InMemoryTeamsRepository;
  let sut: UpdateTeamUseCase;

  const team = TeamsEntity.create({
    name: 'Team 1',
  });

  beforeEach(() => {
    inMemoryTeamsRepository = new InMemoryTeamsRepository();
    inMemoryTeamsRepository.create({ team });
    sut = new UpdateTeamUseCase(inMemoryTeamsRepository);
  });

  it('should be able to update an team', async () => {
    const output = await sut.execute({
      id: team.id,
      name: 'New name',
    });

    expect(output.isRight()).toBe(true);
    expect(output.value.name).toBe('New name');
  });

  it('not should be able to update an team with invalid id', async () => {
    const output = await sut.execute({
      id: new UniqueEntityId('12345'),
      name: 'New Name',
    });

    expect(output.isLeft()).toBe(true);
    expect(output.value).toEqual(new Error('Team not found'));
  });
});
