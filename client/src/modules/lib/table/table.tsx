import './style.ts';
import Div from "./style"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

import * as f from '../../functions';
import * as d from '../datafns';
import * as _ from './table_logic';
import EnhancedTableHead from './tablehead';

export default function EnhancedTable(props: _.EnhancedTableProps) {

  const [data, setData] = React.useState<d.obj[]>(props.data);
  const [order, setOrder] = React.useState<false | "desc" | "asc" | undefined>('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const page = 0;
  const dense = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(data.length);
  const [rows, setRows] = React.useState<d.obj[]>([]);

  const handleRequestSort = (event: React.MouseEvent, property: string) => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    let header = event.currentTarget.firstChild!.firstChild as any
    let label = header.data as string
    let sorted = (data.sort(_.sortByProperty(label, order as string)));
    setRows(sorted.map((e: d.obj) => {
      return Object.values(e).map((e, index) => {
        if (typeof e === 'number') e = e.toFixed(2);
        return <TableCell key={index} align="left">{e}</TableCell>
      })
    }));
  };

  React.useEffect(() => {
    if (f.notEmpty(props.data)) {
      setData(props.data);
      setRows(props.data.map(e => {
        return Object.values(e).map((e, index) => {
          if (typeof e === 'number') e = e.toFixed(2)
          return <TableCell key={index} align="left">{e as string | number}</TableCell>
        })
      }));
      setRowsPerPage(props.data.length);
    } else {
      setData([]);
      setRows([]);
      setRowsPerPage(0);
    }
  }, [props.data]);

  return (
    <Div >
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              data={data}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      {rows[index]}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <_.EmptyMessage data={props.data} />
    </Div>
  );
}
