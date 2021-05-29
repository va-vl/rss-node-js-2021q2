import * as uuid from 'uuid';
// 
import ITaskProps from './task.types';

class Task {
  id: string;
  title: string;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  order: number;

  constructor({
    id = uuid.v4(),
    title = 'Task Title',
    description = 'A default task description',
    userId = null,
    boardId = null,
    columnId = null,
    order = 0,
  }: ITaskProps = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.order = order;
  }

  static toResponse(task: Task): {
    id: string;
    title: string;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
    order: number
  } {
    const { id, title, description, userId, boardId, columnId, order } = task;

    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}

export default Task;
