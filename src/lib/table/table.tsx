
import "./style.scss"
// import Div from "./style"
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { InputGroup } from "react-bootstrap"
import * as f from '../../components/functions';
import * as d from '../datafns';
import * as _ from './logic';
import * as R from "rambda"
import EnhancedTableHead from './tablehead';

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "blue"
  },
}))

function Cell({ contents }) {
  return (
    <TableCell align="left">
      {
        R.is(Object, contents)
          ? <div className="cell">
            <span style={{ background: `${contents.color}`, color: `${contents.color}` }}>{"___"}  </span>
            <a>{contents.value as string | number}</a>
          </div>
          : <div className="cell">
            {contents as string | number}
          </div>
      }
    </TableCell>
  )
}

export default function EnhancedTable(props: _.EnhancedTableProps) {

  const classes = useStyles();
  const [data, setData] = React.useState<d.obj[]>([]);
  const [order, setOrder] = React.useState(props.initOrder || "asc");
  const [orderBy, setOrderBy] = React.useState('calories');
  const [rows, setRows] = React.useState<d.obj[]>([]);
  const tableContainer = React.useRef(null);

  function handleRequestSort(event: React.MouseEvent, property: string) {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (props.sortCallback) {
      props.sortCallback({ by: event.currentTarget.textContent, order: isAsc ? 'desc' : 'asc' })
    }
    else {
      let header = event.currentTarget.firstChild!.firstChild as any
      let label = header.data as string
      let sorted = (data.sort(_.sortByProperty(label, order as string)));
      setRows(sorted.map((e: d.obj) => {
        return Object.values(e).map((e, index) => {
          if (typeof e === 'number' && e % 1 !== 0) e = e.toFixed(2)
          return <Cell contents={e} key={index} />
        })
      }));
    }
  };

  function updateTable() {
    if (f.notEmpty(props.data)) {
      setData(props.data);
      setRows(props.data.map(e => {
        return Object.values(e).map((e, index) => {
          if (typeof e === 'number') e = + (Math.round(e * 100) / 100)
          return <Cell contents={e} key={index} />
        })
      }));
    }
  }

  function onScroll() {
    let { scrollTop, scrollHeight, clientHeight } = tableContainer.current;
    const position = scrollHeight - scrollTop - clientHeight
    if (props.bufferCallback) {
      if (position <= 0)
        props.bufferCallback(1);
      if (position >= scrollHeight - clientHeight)
        props.bufferCallback(-1);
    }
  }

  React.useEffect(
    function () {
      updateTable();
    }, [props.data]
  );

  return (
    <div className="Table" ref={tableContainer} onScroll={onScroll}>
      <Table
        stickyHeader
        aria-labelledby="tableTitle"
        size='small'
        aria-label="enhanced table"
      >
        <EnhancedTableHead className={classes.head}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          data={data}
        />
        <TableBody className="tableBody">
          {rows
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
      <_.EmptyMessage data={props.data} />
    </div>
  );

}

