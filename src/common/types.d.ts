export interface IUser {
  id: string;
  name?: string;
  login?: string;
  password?: string;
}

export type UserDTO = Omit<IUser, 'id'>;

export interface IBoard {
  id: string;
  title?: string;
  columns?: Column[];
}

export type BoardDTO = Omit<IBoard, 'id'>;

export interface IColumn {
  id: string;
  title?: string;
  order?: number;
}

export interface ITask {
  id: string;
  title?: string;
  description?: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
  order?: number;
}

export type TaskDTO = Omit<ITask, 'id'>;
