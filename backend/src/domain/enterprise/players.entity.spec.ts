import { UniqueEntityId } from '../../core/domain/entity/unique-id.entity';
import { PlayersEntity } from './players.entity';

describe('Player - Entity', () => {
  it('should be able to create a player', () => {
    const player = PlayersEntity.create({
      age: 18,
      name: 'Player 1',
      teamId: new UniqueEntityId('123'),
    });

    expect(player.name).toEqual('Player 1');
    expect(player.teamId).toBeInstanceOf(UniqueEntityId);
    expect(player.age).toBe(18);
  });
});
