import Column from './column.model';

interface IBoardProps {
  id?: string;
  title?: string;
  columns?: Column[];
}

export default IBoardProps;
