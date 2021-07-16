import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Task } from './entities/task.entity';
import { CreateTaskDTO } from './input/create-task.dto';
import { UpdateTaskDTO } from './input/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAll(boardId: string) {
    return this.taskRepository.find({
      where: { boardId },
      loadRelationIds: true,
    });
  }

  async getById(boardId: string, id: string) {
    return this.taskRepository.findOne({
      where: { boardId, id },
      loadRelationIds: true,
    });
  }

  async create(boardId: string, createTaskDTO: CreateTaskDTO) {
    return this.taskRepository.save(
      this.taskRepository.create({ ...createTaskDTO, boardId }),
    );
  }

  async update(boardId: string, id: string, updateTaskDTO: UpdateTaskDTO) {
    const task = await this.getById(boardId, id);

    if (task === undefined) {
      return task;
    }

    const newTask = this.taskRepository.create({ ...task, ...updateTaskDTO });
    return this.taskRepository.save(newTask);
  }

  async remove(boardId: string, id: string) {
    const task = await this.getById(boardId, id);

    if (task === undefined) {
      return false;
    }

    await this.taskRepository.remove(task);
    return true;
  }
}
