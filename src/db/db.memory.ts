import IUserProps from '../resources/users/user.types';
import ITaskProps from '../resources/tasks/task.types';
import IBoardProps from '../resources/boards/board.types';
import Board from '../resources/boards/board.model';
import Task from '../resources/tasks/task.model';
import User from '../resources/users/user.model';
import { DataCorruptedError } from '../errors';

const db: {
  Users: User[],
  Boards: Board[],
  Tasks: Task[],
} = {
  Tasks: [],
  Users: [],
  Boards: [],
};

const validateArray = (
  arr: User[] | Board[] | Task[],
  name: string,
  id: string,
): boolean => {
  if (arr.length > 1) {
    throw new DataCorruptedError(name, id);
  }

  return arr.length > 0;
}

const getAllUsers = async (): Promise<User[]> => db.Users.map((user: User): User => user);

const getUserById = async (id: string): Promise<User|undefined> => {
  const users = db.Users.filter((user: User): boolean => user.id === id);

  return validateArray(users, 'User', id) ? users[0] : undefined;
} 

const createUser = async (props: IUserProps): Promise<User> => {
  if (props.id !== undefined) {
    const existingUser = await getUserById(props.id);

    if (existingUser !== undefined) {
      throw new DataCorruptedError('User', props.id);
    }
  }

  const user = new User(props);
  db.Users.push(user);
  return user;
}

const updateUser = async (
  id: string, 
  props: IUserProps
): Promise<User|undefined> => {
  const existingUser = await getUserById(id);

  if (existingUser === undefined) {
    return undefined;
  }

  return Object.assign(existingUser, {...props});
}

const removeUser = async (id: string) => {
  const unwantedUser = await getUserById(id);

  if (unwantedUser === undefined) {
    return false;
  }

  db.Users = db.Users.filter((user: User): boolean => user.id !== id);
  db.Tasks = db.Tasks.map((task: Task): Task => (
    task.userId !== id ? task : ({ ...task, userId: null })
  ));

  return true;
}

const getAllBoards = async (): Promise<Board[]> => db.Boards.map((board: Board): Board => board);

const getBoardById = async (id: string): Promise<Board|undefined> => {
  const boards = db.Boards.filter((board: Board): boolean => board.id === id);

  return validateArray(boards, 'Board', id) ? boards[0] : undefined;
};

const createBoard = async (props: IBoardProps): Promise<Board> => {
  if (props.id !== undefined) {
    const existingBoard = await getBoardById(props.id);
    
    if (existingBoard !== undefined) {
      throw new DataCorruptedError('Board', props.id);
    }
  }

  const board = new Board(props);
  db.Boards.push(board);
  return board;
};

const updateBoard = async (
  id: string, props: 
  IBoardProps
): Promise<Board|undefined> => {
  const existingBoard = await getBoardById(id);

  if (existingBoard === undefined) {
    return undefined;
  }

  return Object.assign(existingBoard, {...props});
}

const removeBoard = async (id: string): Promise<boolean> => {
  const unwantedBoard = await getBoardById(id);

  if (unwantedBoard === undefined) {
    return false;
  } 

  db.Boards = db.Boards.filter((board: Board): boolean => board.id !== id);
  db.Tasks = db.Tasks.filter((task: Task): boolean => task.boardId !== id);

  return true;
}

const getAllTasks = async (
  boardId: string
): Promise<Task[]> => db.Tasks.filter((task: Task): boolean => task.boardId === boardId);

const getTaskById = async (
  boardId: string, 
  id: string
): Promise<Task|undefined> => {
  const tasks = db.Tasks.filter((task: Task): boolean => task.boardId === boardId && task.id === id);

  return validateArray(tasks, `Task on Board ${boardId}`, id)
    ? tasks[0]
    : undefined;
}

const createTask = async (
  boardId: string,
  props: ITaskProps,
): Promise<Task> => {
  if (props.id !== undefined) {
    const existingTask = await getTaskById(boardId, props.id);

    if (existingTask !== undefined) {
      throw new DataCorruptedError(`Task on Board ${boardId}`, props.id);
    }
  }

  const task = new Task(props);
  db.Tasks.push(task);
  return task;
};

const updateTask = async (
  boardId: string,
  id: string,
  props: ITaskProps,
): Promise<Task|undefined> => {
  const existingTask = await getTaskById(boardId, id);

  if (existingTask === undefined) {
    return undefined;
  }

  return Object.assign(existingTask, { ...props });
}

const removeTask = async (
  boardId: string,
  id: string,
): Promise<boolean> => {
  const unwantedTask = await getTaskById(boardId, id);

  if (unwantedTask === undefined) {
    return false;
  } 

  db.Tasks = db.Tasks.filter((task: Task): boolean => task.boardId !== boardId && task.id !== id);

  return true;
}

/* #region init db for postman testing */
(() => {
  const createString = (num = 1000) => String(Math.floor(Math.random() * num));

  for (let i = 0; i < 5; i += 1) {
    db.Users.push(
      new User({
        id: String(i),
        name: createString(),
        login: createString(10_000),
        password: createString(100_000),
      })
    );
  }

  db.Boards.push(
    new Board({ id: '0', title: 'Test board' }),
    new Board({ id: '1', title: 'Test board' })
  );

  if (db.Users[0] && db.Boards[0] && db.Boards[0].columns[0]) {
    db.Tasks.push(
      new Task({
        id: '0',
        title: 'Test Task',
        userId: db.Users[0].id,
        boardId: db.Boards[0].id,
        columnId: db.Boards[0].columns[0].id,
      }),
      new Task({
        id: '1',
        title: 'Test Task',
        userId: db.Users[0].id,
        boardId: db.Boards[0].id,
        columnId: db.Boards[0].columns[0].id,
        order: 1,
      }),
    );
  }

  if (db.Users[1] && db.Boards[1] && db.Boards[1].columns[0]) {
    db.Tasks.push(
      new Task({
        id: '0',
        title: 'Test Task',
        userId: db.Users[1].id,
        boardId: db.Boards[1].id,
        columnId: db.Boards[1].columns[0].id
      })
    )
  }
})();
/* #endregion */

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  // 
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
  // 
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
};
