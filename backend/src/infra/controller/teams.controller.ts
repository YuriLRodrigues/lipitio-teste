import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UniqueEntityId } from 'src/core/domain/entity/unique-id.entity';
import { CreateTeamUseCase } from 'src/domain/application/use-cases/teams/create-team.use-case';
import { DeleteTeamUseCase } from 'src/domain/application/use-cases/teams/delete-team.use-case';
import { UpdateTeamUseCase } from 'src/domain/application/use-cases/teams/update-team.use-case';
import { FindAllTeamsUseCase } from 'src/domain/application/use-cases/teams/find-all-teams.use-case';
import { CreateTeamDTO } from './dto/teams/create-team.dto';
import { UpdateTeamDTO } from './dto/teams/update-team.dto';
import { DeleteTeamDTO } from './dto/teams/delete-team.dto';
import { FindTeamDetailsByIdUseCase } from 'src/domain/application/use-cases/teams/find-team-details-by-id.use-case';
import { FindTeamByIdDTO } from './dto/teams/find-team-by-id.dto';

@Controller('/teams')
export class TeamsController {
  constructor(
    private readonly createTeamUseCase: CreateTeamUseCase,
    private readonly deleteTeamUseCase: DeleteTeamUseCase,
    private readonly updateTeamUseCase: UpdateTeamUseCase,
    private readonly findAllTeamsUseCase: FindAllTeamsUseCase,
    private readonly findTeamDetailsByIdUseCase: FindTeamDetailsByIdUseCase,
  ) {}

  @Post()
  async create(@Body() { name }: CreateTeamDTO) {
    const team = await this.createTeamUseCase.execute({
      name,
    });

    if (team.isLeft()) {
      const error = team.value;

      switch (error.message) {
        case 'Team already exists':
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

    return team.value;
  }

  @Post('update')
  async update(@Body() { name, id }: UpdateTeamDTO) {
    const team = await this.updateTeamUseCase.execute({
      name,
      id: new UniqueEntityId(id),
    });

    if (team.isLeft()) {
      const error = team.value;

      switch (error.message) {
        case 'Team not found':
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

    return team.value;
  }

  @Get('/:id')
  async findDetailsById(@Param() { id }: FindTeamByIdDTO) {
    const team = await this.findTeamDetailsByIdUseCase.execute({
      id: new UniqueEntityId(id),
    });

    if (team.isLeft()) {
      const error = team.value;

      switch (error.message) {
        case 'Team not found':
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
    return team.value;
  }

  @Get()
  async findAll() {
    const teams = await this.findAllTeamsUseCase.execute();

    if (teams.isLeft()) {
      const error = teams.value;

      switch (error.message) {
        case 'No teams found':
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

    return teams.value;
  }

  @Delete('/:id')
  async delete(@Param() { id }: DeleteTeamDTO) {
    const team = await this.deleteTeamUseCase.execute({
      id: new UniqueEntityId(id),
    });

    if (team.isLeft()) {
      const error = team.value;

      switch (error.message) {
        case 'Team not found':
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

    return 'Team deleted succesfully';
  }
}
