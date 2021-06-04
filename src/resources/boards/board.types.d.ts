export interface IColumnProps {
  id?: string;
  title?: string;
  order?: number;
}

export interface IBoardProps {
  id?: string;
  title?: string;
  columns?: Column[];
}
