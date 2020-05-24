import './style.ts';
import Div from "./style"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React from 'react';

import * as f from '../../functions';
import * as d from '../datafns';
import * as _ from './table_logic';
import EnhancedTableHead from './tablehead';

export default function EnhancedTable(props: _.EnhancedTableProps) {

  const page = 0;
  const rowsPerBuffer = 100;

  const [displayBuffer, setDisplayBuffer] = React.useState(true)
  const [data, setData] = React.useState<d.obj[]>(props.data);
  const [order, setOrder] = React.useState<false | "desc" | "asc" | undefined>('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const dense = false;
  const [rowCount, setRowCount] = React.useState(0);
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
        if (typeof e === 'number' && e % 1 !== 0) e = e.toFixed(2)
        return <TableCell key={index} align="left">{e}</TableCell>
      })
    }));
  };

  function Buffer() {
    return displayBuffer
      ? <KeyboardArrowDownIcon onClick={() => setRowCount(rowCount + rowsPerBuffer)} />
      : <></>
  }

  React.useEffect(() => {
    if (f.notEmpty(props.data)) {
      setData(props.data);
      setRows(props.data.map(e => {
        return Object.values(e).map((e, index) => {
          if (typeof e === 'number' && e % 1 !== 0) e = e.toFixed(2)
          return <TableCell key={index} align="left">{e as string | number}</TableCell>
        })
      }));
      setRowCount(rowsPerBuffer);
      setDisplayBuffer(true)
    } else {
      setData([]);
      setRows([]);
      setRowCount(0);
    }
  }, [props.data]);

  React.useEffect(() => {
    if (rowCount >= props.data.length) setDisplayBuffer(false)
  }, [rowCount])

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
                .slice(page * rowCount, page * rowCount + rowCount)
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
      <Buffer />
      <_.EmptyMessage data={props.data} />
    </Div>
  );
}
