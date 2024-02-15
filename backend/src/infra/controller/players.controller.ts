import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreatePlayerUseCase } from 'src/domain/application/use-cases/players/create-player.use-case';
import { DeletePlayerUseCase } from 'src/domain/application/use-cases/players/delete-player.use-case';
import { FindAllPlayersUseCase } from 'src/domain/application/use-cases/players/find-all-players.use-case';
import { UpdatePlayerUseCase } from 'src/domain/application/use-cases/players/update-player.use-case';
import { CreatePlayerDTO } from './dto/players/create-player.dto';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { DeletePlayerDTO } from './dto/players/delete-player.dto';
import { UpdatePlayerDTO } from './dto/players/update-player.dto';

@Controller('/players')
export class PlayersController {
  constructor(
    private readonly createPlayerUseCase: CreatePlayerUseCase,
    private readonly deletePlayerUseCase: DeletePlayerUseCase,
    private readonly updatePlayerUseCase: UpdatePlayerUseCase,
    private readonly findAllPlayersUseCase: FindAllPlayersUseCase,
  ) {}

  @Post()
  async create(@Body() { age, name, teamId }: CreatePlayerDTO) {
    const player = await this.createPlayerUseCase.execute({
      age,
      name,
      teamId: new UniqueEntityId(teamId),
    });

    if (player.isLeft()) {
      const error = player.value;

      switch (error.message) {
        case 'Player already exists':
          throw new ConflictException({
            statusCode: HttpStatus.CONFLICT,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return player.value.props;
  }

  @Post('update')
  async update(@Body() { age, name, teamId, id }: UpdatePlayerDTO) {
    const player = await this.updatePlayerUseCase.execute({
      age,
      name,
      teamId: new UniqueEntityId(teamId),
      id: new UniqueEntityId(id),
    });

    if (player.isLeft()) {
      const error = player.value;

      switch (error.message) {
        case 'Player not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return player.value.props;
  }

  @Get()
  async findAll() {
    const players = await this.findAllPlayersUseCase.execute();

    if (players.isLeft()) {
      const error = players.value;

      switch (error.message) {
        case 'No players found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return players.value;
  }

  @Delete()
  async delete(@Body() { id }: DeletePlayerDTO) {
    const players = await this.deletePlayerUseCase.execute({
      id: new UniqueEntityId(id),
    });

    if (players.isLeft()) {
      const error = players.value;

      switch (error.message) {
        case 'Player not found':
          throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            error: error.message,
          });
        default:
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Internal API error',
          });
      }
    }

    return players.value;
  }
}
