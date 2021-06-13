import DBStorage from './db.memory.storage';
import { IUserProps } from '../resources/users/user.types';
import { ITaskProps } from '../resources/tasks/task.types';
import { IBoardProps } from '../resources/boards/board.types';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';
import User from '../resources/users/user.model';
import {
  DataCorruptedError,
  EntityNotFoundError,
  InvalidOperationError,
} from '../errors';

const db = {
  Users: new DBStorage<User>('User'),
  Boards: new DBStorage<Board>('Board'),
  Tasks: [] as Task[],
};

// #region users
export const getAllUsers = async (): Promise<User[]> => db.Users.getAll();

export const getUserById = async (id: string): Promise<User> =>
  db.Users.getById(id);

export const createUser = async (props: IUserProps): Promise<User> =>
  db.Users.add(new User(props));

export const updateUser = async (
  id: string,
  props: IUserProps
): Promise<User> => {
  const existingUsers = db.Users.getAllById(id);

  if (existingUsers[0] === undefined) {
    throw new InvalidOperationError('User', id, 'Update');
  }

  return db.Users.replace(
    existingUsers[0],
    new User({ ...existingUsers[0], ...props })
  );
};

export const removeUser = async (id: string): Promise<void> => {
  db.Users.remove(id);
  db.Tasks = db.Tasks.map((task) =>
    task.userId !== id ? task : new Task({ ...task, userId: null })
  );
};
// #endregion

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

/* #region init db for postman testing */
(() => {
  const createString = (num = 1000) => String(Math.floor(Math.random() * num));

  for (let i = 0; i < 5; i += 1) {
    db.Users.add(
      new User({
        id: String(i),
        name: createString(),
        login: createString(10_000),
        password: createString(100_000),
      })
    );
  }

  db.Boards.add(new Board({ id: '0', title: 'Test board' }));
  db.Boards.add(new Board({ id: '1', title: 'Test board' }));

  if (
    db.Users.store[0] &&
    db.Boards.store[0] &&
    db.Boards.store[0].columns[0]
  ) {
    db.Tasks.push(
      new Task({
        id: '0',
        title: 'Test Task',
        userId: db.Users.store[0].id,
        boardId: db.Boards.store[0].id,
        columnId: db.Boards.store[0].columns[0].id,
      }),
      new Task({
        id: '1',
        title: 'Test Task',
        userId: db.Users.store[0].id,
        boardId: db.Boards.store[0].id,
        columnId: db.Boards.store[0].columns[0].id,
        order: 1,
      })
    );
  }

  if (
    db.Users.store[1] &&
    db.Boards.store[1] &&
    db.Boards.store[1].columns[0]
  ) {
    db.Tasks.push(
      new Task({
        id: '0',
        title: 'Test Task',
        userId: db.Users.store[1].id,
        boardId: db.Boards.store[1].id,
        columnId: db.Boards.store[1].columns[0].id,
      })
    );
  }
})();
/* #endregion */
