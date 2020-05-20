import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useData from './data';
import useDate from '../usedate/usedate';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import HeaderBar from '../header_bar'
import SimpleSelect from '../select/useselect'
import Table from '../table/table'
import * as d from "./datafns"

export default function CustomerCredit(props: {db: string, header: string}) {

    const {
        data
    } = useData(`/api/credit/${props.db}`, (data) => { return data });

    // const [tableData, setTableData] = useState([]);
    // const Table = useTable(data as d.obj[])
    // useEffect(() => {
    //     setTableData(data);
    // }, [data])

    return (
        <div className='report'>
            <Paper className='reportContainer'>
                <HeaderBar ><Typography className='text' variant="h6">{props.header}</Typography></HeaderBar>
                <div className='reportBody'>
                    <Table  data={data} />
                </div>
            </Paper>
        </div>
    );
} 