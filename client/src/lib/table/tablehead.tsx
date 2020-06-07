import "./style.scss"
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';

import * as d from '../datafns';
import * as _ from './logic';

export default function EnhancedTableHead(props: _.EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    onRequestSort(event, property);
  };
  const [headCells, setHeadCells] = React.useState<_.HeadCell[]>([]);
  const [data, setData] = React.useState<d.obj[]>([]);

  React.useEffect(() => {
    if (d.notEmpty(props.data) && data !== props.data) {
      setHeadCells(Object.keys(props.data[0]).map((e, index) => {
        let isNum = (typeof props.data[0][e] == 'number') ? true : false
        return {
          id: index + 1 + '',
          numeric: isNum,
          disablePadding: false,
          label: e
        }
      }));
      setData(props.data);
    } else setHeadCells([]);
  }, [props.data]);

  return (
      <TableHead  >
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
              onClick={createSortHandler(headCell.id)}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order as "desc" | "asc" | undefined : 'asc'}
              >
                {headCell.label}
                {/* {orderBy === headCell.id ? (
                <span className={"sort-message"}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
  );
}
