import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
//
import { CreateTaskDTO } from './input/create-task.dto';
import { TaskID } from './input/task-id.input';
import { UpdateTaskDTO } from './input/update-task.dto';
import { TaskService } from './task.service';

@Controller('/boards/:boardId/tasks')
export class TaskController {
  constructor(
    @Inject(TaskService)
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async getAll(@Param() input: TaskID) {
    return this.taskService.getAll(input.boardId);
  }

  @Get(':id')
  async getById(@Param() input: TaskID) {
    const task = await this.taskService.getById(input.boardId, input.id);

    if (task === undefined) {
      throw new NotFoundException();
    }

    return task;
  }

  @Post()
  async create(@Param() input: TaskID, @Body() createTaskDTO: CreateTaskDTO) {
    let task;

    try {
      task = await this.taskService.create(input.boardId, createTaskDTO);
    } catch {
      throw new InternalServerErrorException();
    }

    return task;
  }

  @Put(':id')
  async update(@Param() input: TaskID, @Body() updateTaskDTO: UpdateTaskDTO) {
    return this.taskService.update(input.boardId, input.id, updateTaskDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() input: TaskID) {
    const isTaskRemoved = this.taskService.remove(input.boardId, input.id);

    if (!isTaskRemoved) {
      throw new NotFoundException();
    }
  }
}
