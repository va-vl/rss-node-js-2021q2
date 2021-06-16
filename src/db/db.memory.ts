import DBStorage from './db.memory.storage';
import { ITaskProps } from '../resources/tasks/task.types';
import { IBoardProps } from '../resources/boards/board.types';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';
import {
  DataCorruptedError,
  EntityNotFoundError,
  InvalidOperationError,
} from '../errors';

const db = {
  Boards: new DBStorage<Board>('Board'),
  Tasks: [] as Task[],
};

// #region boards
export const getAllBoards = async (): Promise<Board[]> => db.Boards.getAll();

export const getBoardById = async (id: string): Promise<Board> =>
  db.Boards.getById(id);

export const createBoard = async (props: IBoardProps): Promise<Board> =>
  db.Boards.add(new Board(props));

export const updateBoard = async (
  id: string,
  props: IBoardProps
): Promise<Board> => {
  const existingBoards = db.Boards.getAllById(id);

  if (existingBoards[0] === undefined) {
    throw new InvalidOperationError('User', id, 'Update');
  }

  return db.Boards.replace(
    existingBoards[0],
    new Board({ ...existingBoards[0], ...props })
  );
};

export const removeBoard = async (id: string): Promise<void> => {
  db.Boards.remove(id);
  db.Tasks = db.Tasks.filter((task) => task.boardId !== id);
};
// #endregion

// #region tasks
export const getAllTasks = async (boardId: string): Promise<Task[]> =>
  db.Tasks.filter((task: Task): boolean => task.boardId === boardId);

export const getTaskById = async (
  boardId: string,
  id: string
): Promise<Task> => {
  const tasks = db.Tasks.filter(
    (task) => task.boardId === boardId && task.id === id
  );

  if (tasks.length > 1) {
    throw new DataCorruptedError(`Task on Board ${boardId}`, id);
  }

  if (tasks[0] === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return tasks[0];
};

export const createTask = async (
  boardId: string,
  props: ITaskProps
): Promise<Task> => {
  if (props.id !== undefined) {
    const existingTasks = db.Tasks.filter(
      (task) => task.boardId === boardId && task.id === props.id
    );

    if (existingTasks.length > 0) {
      throw new DataCorruptedError(`Task on Board ${boardId}`, props.id);
    }
  }

  const task = new Task({ ...props, boardId });
  db.Tasks.push(task);
  return task;
};

export const updateTask = async (
  boardId: string,
  id: string,
  props: ITaskProps
): Promise<Task> => {
  const existingTasks = db.Tasks.filter(
    (task) => task.boardId === boardId && task.id === id
  );

  if (existingTasks.length > 1) {
    throw new DataCorruptedError(`Task on Board ${boardId}`, id);
  }

  if (existingTasks[0] === undefined) {
    throw new InvalidOperationError('Task', id, 'Update', { boardId });
  }

  const newTask = new Task({ ...existingTasks[0], ...props });
  db.Tasks[db.Tasks.indexOf(existingTasks[0])] = newTask;
  return newTask;
};

export const removeTask = async (
  boardId: string,
  id: string
): Promise<void> => {
  const existingTasks = db.Tasks.filter(
    (task) => task.boardId === boardId && task.id === id
  );

  if (existingTasks.length > 1) {
    throw new DataCorruptedError(`Task on Board ${boardId}`, id);
  }

  if (existingTasks[0] === undefined) {
    throw new InvalidOperationError('Task', id, 'Remove', { boardId });
  }

  db.Tasks = db.Tasks.filter((task) => task !== existingTasks[0]);
};
// #endregion
