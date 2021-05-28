import Column = require('./column.model');

interface IBoardProps {
  id?: string;
  title?: string;
  columns?: Column[];
}

export = IBoardProps;